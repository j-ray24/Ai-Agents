import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  DocumentTextIcon,
  UserCircleIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

interface AgentSettings {
  name: string;
  role: string;
  responseTime: {
    min: number;
    max: number;
  };
  notifications: {
    email: boolean;
    slack: boolean;
    desktop: boolean;
  };
  knowledgeBase: string[];
  integrations: {
    slack: boolean;
    teams: boolean;
    zendesk: boolean;
  };
}

const SettingsTab = () => {
  const [settings, setSettings] = useState<AgentSettings>({
    name: 'FTC Sarah',
    role: 'Tree Service Customer Specialist',
    responseTime: {
      min: 1,
      max: 3,
    },
    notifications: {
      email: true,
      slack: true,
      desktop: false,
    },
    knowledgeBase: [
      'Tree Service Manual v2.5',
      'Emergency Response Guidelines',
      'Customer Service Best Practices',
      'Equipment Specifications',
    ],
    integrations: {
      slack: true,
      teams: false,
      zendesk: true,
    },
  });

  const handleNotificationChange = (type: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleIntegrationChange = (type: keyof typeof settings.integrations) => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [type]: !prev.integrations[type],
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <UserCircleIcon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Agent Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={settings.role}
              onChange={(e) => setSettings(prev => ({ ...prev, role: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Response Time Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Cog6ToothIcon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Response Time</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum (seconds)</label>
            <input
              type="number"
              value={settings.responseTime.min}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                responseTime: { ...prev.responseTime, min: Number(e.target.value) }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum (seconds)</label>
            <input
              type="number"
              value={settings.responseTime.max}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                responseTime: { ...prev.responseTime, max: Number(e.target.value) }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BellIcon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
              <button
                onClick={() => handleNotificationChange(key as keyof typeof settings.notifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  value ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    value ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <DocumentTextIcon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Knowledge Base</h2>
        </div>
        <div className="space-y-4">
          {settings.knowledgeBase.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{item}</span>
              <button className="text-primary hover:text-primary-dark">
                Edit
              </button>
            </div>
          ))}
          <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-primary hover:text-primary">
            + Add Document
          </button>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <LinkIcon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.integrations).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
              <button
                onClick={() => handleIntegrationChange(key as keyof typeof settings.integrations)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  value ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    value ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
