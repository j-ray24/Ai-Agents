import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  UserPlusIcon, 
  ChartBarIcon, 
  MegaphoneIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/customer-service', label: 'Customer Service', icon: UserGroupIcon },
    { path: '/employee-onboarding', label: 'Employee Onboarding', icon: UserPlusIcon },
    { path: '/lead-generation', label: 'Lead Generation', icon: ChartBarIcon },
    { path: '/marketing', label: 'Marketing', icon: MegaphoneIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">AI Agents</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200">
          <button className="nav-link w-full">
            <Cog6ToothIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
