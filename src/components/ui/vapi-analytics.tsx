import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Phone, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw,
  Calendar,
  Filter,
  Download,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface VAPILog {
  time: string;
  orgId: string;
  type: 'API' | 'Webhook' | 'Call' | 'Provider';
  webhookType?: string;
  resource?: string;
  requestDurationSeconds?: number;
  requestStartedAt?: string;
  requestFinishedAt?: string;
  requestBody?: any;
  requestHttpMethod?: string;
  requestUrl?: string;
  requestPath?: string;
  requestQuery?: string;
  responseHttpCode?: number;
  requestIpAddress?: string;
  requestOrigin?: string;
  responseBody?: any;
  requestHeaders?: any;
  error?: { message: string };
  assistantId?: string;
  phoneNumberId?: string;
  customerId?: string;
  squadId?: string;
  callId?: string;
}

interface VAPIResponse {
  results: VAPILog[];
  metadata: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
  };
}

export default function VAPIAnalytics() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<VAPILog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [filters, setFilters] = useState({
    type: '',
    limit: 50,
    page: 1,
    sortOrder: 'DESC' as 'ASC' | 'DESC'
  });
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalCalls: 0,
    successfulCalls: 0,
    failedCalls: 0,
    avgDuration: 0
  });

  useEffect(() => {
    loadAPIKey();
  }, [user]);

  useEffect(() => {
    if (apiKey) {
      fetchLogs();
    }
  }, [apiKey, filters]);

  const loadAPIKey = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('vapi_api_key')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading API key:', error);
        return;
      }

      if (data?.vapi_api_key) {
        setApiKey(data.vapi_api_key);
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  };

  const fetchLogs = async () => {
    if (!apiKey) {
      setError('Please configure your VAPI API key in settings first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        limit: filters.limit.toString(),
        page: filters.page.toString(),
        sortOrder: filters.sortOrder
      });

      if (filters.type) {
        params.append('type', filters.type);
      }

      const response = await fetch(`https://api.vapi.ai/logs?${params}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: VAPIResponse = await response.json();
      setLogs(data.results);
      
      // Calculate stats
      const callLogs = data.results.filter(log => log.type === 'Call');
      const successfulCalls = callLogs.filter(log => !log.error && log.responseHttpCode && log.responseHttpCode < 400);
      const failedCalls = callLogs.filter(log => log.error || (log.responseHttpCode && log.responseHttpCode >= 400));
      const avgDuration = callLogs.reduce((sum, log) => sum + (log.requestDurationSeconds || 0), 0) / callLogs.length || 0;

      setStats({
        totalCalls: callLogs.length,
        successfulCalls: successfulCalls.length,
        failedCalls: failedCalls.length,
        avgDuration
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch logs');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (log: VAPILog): string => {
    if (log.error) return 'text-red-400';
    if (log.responseHttpCode && log.responseHttpCode >= 400) return 'text-red-400';
    if (log.responseHttpCode && log.responseHttpCode >= 200 && log.responseHttpCode < 300) return 'text-brand-emerald';
    return 'text-gray-400';
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'Call': return 'bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 text-brand-blue border-brand-blue/30';
      case 'API': return 'bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 text-brand-purple border-brand-purple/30';
      case 'Webhook': return 'bg-gradient-to-r from-brand-emerald/20 to-brand-cyan/20 text-brand-emerald border-brand-emerald/30';
      case 'Provider': return 'bg-gradient-to-r from-accent-gold/20 to-accent-rose/20 text-accent-gold border-accent-gold/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-400 border-gray-500/30';
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Time', 'Type', 'Status', 'Duration', 'Method', 'URL', 'Response Code'].join(','),
      ...logs.map(log => [
        log.time,
        log.type,
        log.error ? 'Error' : 'Success',
        log.requestDurationSeconds?.toString() || '',
        log.requestHttpMethod || '',
        log.requestUrl || '',
        log.responseHttpCode?.toString() || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vapi_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!apiKey) {
    return (
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center">
        <AlertCircle className="h-12 w-12 text-accent-gold mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">VAPI API Key Required</h3>
        <p className="text-gray-400 mb-6">
          Please configure your VAPI API key in settings to view analytics.
        </p>
        <Button variant="gradient" onClick={() => window.location.hash = '#settings'}>
          Go to Settings
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan">
              <Phone className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Calls</p>
            <p className="text-3xl font-bold text-white">{stats.totalCalls}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Successful</p>
            <p className="text-3xl font-bold text-brand-emerald">{stats.successfulCalls}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Failed</p>
            <p className="text-3xl font-bold text-red-400">{stats.failedCalls}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Avg Duration</p>
            <p className="text-3xl font-bold text-white">{formatDuration(stats.avgDuration)}</p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value, page: 1 }))}
                className="bg-dark-800/80 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                <option value="">All Types</option>
                <option value="Call">Calls</option>
                <option value="API">API</option>
                <option value="Webhook">Webhook</option>
                <option value="Provider">Provider</option>
              </select>
            </div>

            <select
              value={filters.limit}
              onChange={(e) => setFilters(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
              className="bg-dark-800/80 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={fetchLogs}
              disabled={isLoading}
              className={isLoading ? 'animate-spin' : ''}
            >
              Refresh
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={exportLogs}
              disabled={logs.length === 0}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-brand-purple" />
              VAPI Logs
            </h3>
            {isLoading && (
              <div className="flex items-center text-brand-purple">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-dark-900/80 to-dark-800/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {logs.map((log, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(log.time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getStatusColor(log)}`}>
                          {log.error ? 'Error' : log.responseHttpCode || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDuration(log.requestDurationSeconds)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {log.requestHttpMethod || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setExpandedLog(expandedLog === `${index}` ? null : `${index}`)}
                        className="text-brand-purple hover:text-brand-purple-light transition-colors flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {expandedLog === `${index}` ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {expandedLog === `${index}` && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gradient-to-r from-dark-900/60 to-dark-800/60">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-white font-medium mb-2">Request Details</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="text-gray-400">URL:</span> <span className="text-gray-300">{log.requestUrl || 'N/A'}</span></p>
                                <p><span className="text-gray-400">Path:</span> <span className="text-gray-300">{log.requestPath || 'N/A'}</span></p>
                                <p><span className="text-gray-400">Query:</span> <span className="text-gray-300">{log.requestQuery || 'N/A'}</span></p>
                                <p><span className="text-gray-400">IP:</span> <span className="text-gray-300">{log.requestIpAddress || 'N/A'}</span></p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-medium mb-2">Response Details</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="text-gray-400">Code:</span> <span className="text-gray-300">{log.responseHttpCode || 'N/A'}</span></p>
                                <p><span className="text-gray-400">Started:</span> <span className="text-gray-300">{formatDate(log.requestStartedAt)}</span></p>
                                <p><span className="text-gray-400">Finished:</span> <span className="text-gray-300">{formatDate(log.requestFinishedAt)}</span></p>
                                {log.error && (
                                  <p><span className="text-gray-400">Error:</span> <span className="text-red-400">{log.error.message}</span></p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {(log.requestBody || log.responseBody) && (
                            <div>
                              <h4 className="text-white font-medium mb-2">Request/Response Body</h4>
                              <div className="bg-dark-900/80 rounded-lg p-3 max-h-40 overflow-y-auto">
                                <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                                  {JSON.stringify(log.requestBody || log.responseBody, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          
          {logs.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No logs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}