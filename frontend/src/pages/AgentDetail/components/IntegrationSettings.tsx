import React from 'react';
import {
  Cog6ToothIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const IntegrationSettings = () => {
  const integrations = [
    {
      id: 1,
      name: 'Website Chat Widget',
      status: 'connected',
      lastSync: '5 minutes ago',
      description: 'Embed the agent on your website',
    },
    {
      id: 2,
      name: 'CRM System',
      status: 'connected',
      lastSync: '1 hour ago',
      description: 'Sync customer data with your CRM',
    },
    {
      id: 3,
      name: 'Email Integration',
      status: 'disconnected',
      description: 'Handle customer emails automatically',
    },
    {
      id: 4,
      name: 'SMS Notifications',
      status: 'connected',
      lastSync: '30 minutes ago',
      description: 'Send automated SMS updates',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Integrations</h2>
        <Cog6ToothIcon className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                  {integration.status === 'connected' ? (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Connected
                    </span>
                  ) : (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      Disconnected
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                {integration.lastSync && (
                  <p className="text-xs text-gray-400 mt-1">Last synced: {integration.lastSync}</p>
                )}
              </div>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  integration.status === 'connected'
                    ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    : 'text-primary hover:text-primary-dark hover:bg-primary-50'
                }`}
              >
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* API Configuration */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900">API Key</h4>
              <p className="text-sm text-gray-500">Use this key to authenticate API requests</p>
            </div>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Generate New Key
            </button>
          </div>
          <div className="flex items-center justify-between bg-white rounded-md p-2">
            <code className="text-sm text-gray-600">••••••••••••••••</code>
            <button className="text-gray-400 hover:text-gray-600 text-sm">
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Webhook Configuration */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Webhook Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Conversation Webhook</h4>
              <p className="text-sm text-gray-500">Receive updates for new conversations</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter webhook URL"
                className="text-sm rounded-md border-gray-300"
              />
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary hover:text-primary-dark focus:outline-none">
                <LinkIcon className="w-4 h-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
