import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Marketing from './pages/Marketing';
import HowTheyWork from './pages/HowTheyWork';
import MeetOurAgents from './pages/MeetOurAgents';
import AgentDetail from './pages/AgentDetail';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Training from './pages/Training';
import Insights from './pages/Insights';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn';
import CompanyAgentDetail from './pages/CompanyAgents/CompanyAgentDetail';
import ConversationsTab from './components/agent/tabs/ConversationsTab';
import TrainingTab from './components/agent/tabs/TrainingTab';
import PerformanceTab from './components/agent/tabs/PerformanceTab';
import SettingsTab from './components/agent/tabs/SettingsTab';
import HelpWidget from './components/chat/HelpWidget';
import './styles/globals.css';

// Auth check
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

// ScrollToTop component to handle scroll on route changes
function ScrollToTop() {
  const { useLocation } = require('react-router-dom');
  const location = useLocation();

  const { useEffect } = require('react');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
}

// AppContent component to use hooks
function AppContent() {
  const location = useLocation();
  const isPublicRoute = ['/', '/how-it-works', '/meet-our-agents', '/about', '/pricing', '/marketing'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/how-it-works" element={<HowTheyWork />} />
        <Route path="/meet-our-agents" element={<MeetOurAgents />} />
        <Route path="/agents/:agentId" element={<AgentDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Navigate to="/calendar" />} />
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/training" 
          element={
            <ProtectedRoute>
              <Training />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/insights" 
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat/:agentName" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/company-agents/:agentId" 
          element={
            <ProtectedRoute>
              <CompanyAgentDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/company-agents/:agentId/conversations" 
          element={
            <ProtectedRoute>
              <ConversationsTab 
                agentId="sarah"
                agentRole="Tree Service Customer Specialist"
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/company-agents/:agentId/training" 
          element={
            <ProtectedRoute>
              <TrainingTab />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/company-agents/:agentId/performance" 
          element={
            <ProtectedRoute>
              <PerformanceTab />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/company-agents/:agentId/settings" 
          element={
            <ProtectedRoute>
              <SettingsTab />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {isPublicRoute && <HelpWidget />}
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
