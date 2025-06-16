import React, { useState, useEffect } from 'react';
import { Key, Save, Eye, EyeOff, AlertCircle, CheckCircle, Settings } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface VAPISettingsProps {
  onSettingsSaved?: () => void;
}

export default function VAPISettings({ onSettingsSaved }: VAPISettingsProps) {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://n8n.devjagdish.tech/webhook/981a908f-dedd-4e8d-8791-9255ec51a220');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading settings:', error);
        return;
      }

      if (data) {
        setApiKey(data.vapi_api_key || '');
        setWebhookUrl(data.webhook_url || 'https://n8n.devjagdish.tech/webhook/981a908f-dedd-4e8d-8791-9255ec51a220');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          vapi_api_key: apiKey,
          webhook_url: webhookUrl,
          updated_at: new Date().toISOString()
        });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        onSettingsSaved?.();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save settings' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const testVAPIConnection = async () => {
    if (!apiKey) {
      setMessage({ type: 'error', text: 'Please enter your VAPI API key first' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://api.vapi.ai/logs?limit=1', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'VAPI connection successful!' });
      } else {
        setMessage({ type: 'error', text: `VAPI connection failed: ${response.status}` });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to connect to VAPI. Please check your API key.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !apiKey) {
    return (
      <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4"></div>
          <div className="h-10 bg-white/10 rounded mb-4"></div>
          <div className="h-10 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
      <div className="flex items-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl mr-4">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">VAPI Integration Settings</h3>
          <p className="text-gray-400">Configure your VAPI API key and webhook settings</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl border ${
          message.type === 'success' 
            ? 'bg-gradient-to-r from-brand-emerald/20 to-brand-cyan/20 border-brand-emerald/30' 
            : 'bg-gradient-to-r from-red-500/20 to-red-400/20 border-red-500/30'
        }`}>
          <p className={`text-sm flex items-center ${
            message.type === 'success' ? 'text-brand-emerald' : 'text-red-400'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4 mr-2" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
            {message.text}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            VAPI API Key *
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your VAPI API key"
              className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent pr-12"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Get your API key from your VAPI dashboard
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Webhook URL
          </label>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://your-webhook-url.com"
            className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL where prospect data will be sent
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="gradient"
            onClick={saveSettings}
            disabled={isSaving || !apiKey}
            icon={Save}
            className="flex-1"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
          
          <Button
            variant="outline"
            onClick={testVAPIConnection}
            disabled={isLoading || !apiKey}
            icon={Key}
            className="flex-1"
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-dark-900/60 to-dark-800/60 rounded-xl border border-white/10">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <Key className="h-4 w-4 mr-2 text-brand-purple" />
          How to get your VAPI API Key
        </h4>
        <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
          <li>Log in to your VAPI dashboard</li>
          <li>Navigate to Settings → API Keys</li>
          <li>Create a new API key or copy an existing one</li>
          <li>Paste it in the field above and save</li>
        </ol>
      </div>
    </div>
  );
}