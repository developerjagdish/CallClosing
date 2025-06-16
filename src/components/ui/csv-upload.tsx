import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, Check, AlertCircle, Download, MapPin, User, Phone, Info } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface CSVColumn {
  name: string;
  mappedTo: string;
  preview: string[];
}

interface MappingOption {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  required: boolean;
}

const mappingOptions: MappingOption[] = [
  { key: 'property_address', label: 'Property Address', icon: MapPin, required: true },
  { key: 'owner_name', label: 'Owner Name', icon: User, required: true },
  { key: 'phone_number', label: 'Phone Number', icon: Phone, required: false },
  { key: 'email', label: 'Email', icon: Info, required: false },
  { key: 'additional_info', label: 'Additional Info', icon: Info, required: false },
];

interface CSVUploadProps {
  onUploadComplete?: (count: number) => void;
}

export default function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [columns, setColumns] = useState<CSVColumn[]>([]);
  const [step, setStep] = useState<'upload' | 'mapping' | 'processing' | 'complete'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [webhookResponses, setWebhookResponses] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const parseCSV = useCallback((text: string): string[][] => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      result.push(current.trim());
      return result;
    });
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setFile(uploadedFile);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      
      if (parsed.length < 2) {
        setError('CSV file must have at least a header row and one data row');
        return;
      }

      setCsvData(parsed);
      
      const headers = parsed[0];
      const sampleData = parsed.slice(1, 4); // Show first 3 rows as preview
      
      const initialColumns = headers.map((header, index) => ({
        name: header,
        mappedTo: '',
        preview: sampleData.map(row => row[index] || '')
      }));
      
      setColumns(initialColumns);
      setStep('mapping');
    };
    
    reader.readAsText(uploadedFile);
  }, [parseCSV]);

  const handleMappingChange = (columnIndex: number, mappedTo: string) => {
    setColumns(prev => prev.map((col, index) => 
      index === columnIndex ? { ...col, mappedTo } : col
    ));
  };

  const validateMapping = (): boolean => {
    const requiredFields = mappingOptions.filter(opt => opt.required).map(opt => opt.key);
    const mappedFields = columns.map(col => col.mappedTo).filter(Boolean);
    
    return requiredFields.every(field => mappedFields.includes(field));
  };

  const sendToWebhook = async (prospectData: any): Promise<any> => {
    try {
      const response = await fetch('https://n8n.devjagdish.tech/webhook/981a908f-dedd-4e8d-8791-9255ec51a220', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prospectData)
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Webhook error:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const processUpload = async () => {
    if (!user || !validateMapping()) return;

    setIsProcessing(true);
    setStep('processing');
    setUploadProgress(0);
    
    const dataRows = csvData.slice(1); // Skip header
    const responses: any[] = [];
    
    try {
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        
        // Map CSV data to our schema
        const prospectData: any = {
          user_id: user.id,
        };
        
        const additionalInfo: any = {};
        
        columns.forEach((column, colIndex) => {
          const value = row[colIndex]?.trim() || '';
          
          if (column.mappedTo) {
            if (column.mappedTo === 'additional_info') {
              additionalInfo[column.name] = value;
            } else {
              prospectData[column.mappedTo] = value;
            }
          }
        });
        
        if (Object.keys(additionalInfo).length > 0) {
          prospectData.additional_info = additionalInfo;
        }

        // Send to webhook first
        const webhookResponse = await sendToWebhook(prospectData);
        prospectData.webhook_response = webhookResponse;
        
        // Save to database
        const { data, error } = await supabase
          .from('prospects')
          .insert([prospectData])
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          responses.push({ 
            row: i + 1, 
            success: false, 
            error: error.message,
            webhookResponse 
          });
        } else {
          responses.push({ 
            row: i + 1, 
            success: true, 
            data,
            webhookResponse 
          });
        }
        
        setUploadProgress(((i + 1) / dataRows.length) * 100);
      }
      
      setWebhookResponses(responses);
      setStep('complete');
      onUploadComplete?.(responses.filter(r => r.success).length);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed');
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setCsvData([]);
    setColumns([]);
    setStep('upload');
    setIsProcessing(false);
    setUploadProgress(0);
    setWebhookResponses([]);
    setError('');
  };

  const downloadTemplate = () => {
    const headers = ['Property Address', 'Owner Name', 'Phone Number', 'Email', 'Additional Info'];
    const sampleData = [
      '123 Main St, City, State 12345',
      'John Doe',
      '(555) 123-4567',
      'john@example.com',
      'Interested in selling'
    ];
    
    const csvContent = [headers.join(','), sampleData.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prospects_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (step === 'upload') {
    return (
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl mb-4">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Upload Prospects CSV</h3>
          <p className="text-gray-400">Import your prospect data and send to webhook automatically</p>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-brand-purple/50 transition-colors">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white font-medium mb-2">Click to upload CSV file</p>
              <p className="text-gray-400 text-sm">Supports CSV files up to 10MB</p>
            </label>
          </div>

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={downloadTemplate}
              className="text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white"
            >
              Download Template
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'mapping') {
    return (
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Map CSV Columns</h3>
            <p className="text-gray-400">Match your CSV columns to the required fields</p>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {columns.map((column, index) => (
            <div key={index} className="bg-gradient-to-r from-dark-900/60 to-dark-800/60 rounded-xl p-4 border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="text-white font-medium">{column.name}</label>
                  <div className="text-gray-400 text-sm mt-1">
                    Preview: {column.preview.slice(0, 2).join(', ')}
                    {column.preview.length > 2 && '...'}
                  </div>
                </div>
                
                <div>
                  <select
                    value={column.mappedTo}
                    onChange={(e) => handleMappingChange(index, e.target.value)}
                    className="w-full bg-dark-800/80 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  >
                    <option value="">Select mapping...</option>
                    {mappingOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label} {option.required ? '*' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  {column.mappedTo && (
                    <div className="flex items-center text-brand-emerald">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Mapped</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            * Required fields: Property Address, Owner Name
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={reset}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              onClick={processUpload}
              disabled={!validateMapping()}
            >
              Process Upload
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl mb-4 animate-pulse">
          <Upload className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Processing Upload</h3>
        <p className="text-gray-400 mb-6">Sending data to webhook and saving to database...</p>
        
        <div className="w-full bg-dark-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-brand-purple to-brand-blue h-3 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        
        <p className="text-white font-medium">{Math.round(uploadProgress)}% Complete</p>
      </div>
    );
  }

  if (step === 'complete') {
    const successCount = webhookResponses.filter(r => r.success).length;
    const errorCount = webhookResponses.length - successCount;

    return (
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-emerald to-brand-cyan rounded-2xl mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Upload Complete</h3>
          <p className="text-gray-400">
            {successCount} prospects uploaded successfully
            {errorCount > 0 && `, ${errorCount} failed`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-brand-emerald/20 to-brand-cyan/20 border border-brand-emerald/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-brand-emerald font-medium">Successful</span>
              <span className="text-2xl font-bold text-brand-emerald">{successCount}</span>
            </div>
          </div>
          
          {errorCount > 0 && (
            <div className="bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-red-400 font-medium">Failed</span>
                <span className="text-2xl font-bold text-red-400">{errorCount}</span>
              </div>
            </div>
          )}
        </div>

        {webhookResponses.length > 0 && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Webhook Responses</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {webhookResponses.slice(0, 5).map((response, index) => (
                <div key={index} className="bg-gradient-to-r from-dark-900/60 to-dark-800/60 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Row {response.row}</span>
                    <div className="flex items-center">
                      {response.success ? (
                        <Check className="h-4 w-4 text-brand-emerald" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                  {response.webhookResponse && (
                    <div className="mt-2 text-xs text-gray-400 font-mono">
                      {JSON.stringify(response.webhookResponse, null, 2).slice(0, 100)}...
                    </div>
                  )}
                </div>
              ))}
              {webhookResponses.length > 5 && (
                <p className="text-gray-400 text-sm text-center">
                  And {webhookResponses.length - 5} more...
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button variant="gradient" onClick={reset}>
            Upload Another File
          </Button>
        </div>
      </div>
    );
  }

  return null;
}