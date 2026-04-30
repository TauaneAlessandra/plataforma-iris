import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingScreen } from './features/user/views/OnboardingScreen';
import { CheckInScreen } from './features/checkin/views/CheckInScreen';
import { DashboardScreen } from './features/dashboard/views/DashboardScreen';
import { BreathingScreen } from './features/breathing/views/BreathingScreen';
import { ChatScreen } from './features/support/views/ChatScreen';
import { CommunityFeedScreen } from './features/community/views/CommunityFeedScreen';
import { VaultScreen } from './features/vault/views/VaultScreen';
import { MainLayout } from './shared/layout/MainLayout';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/onboarding" element={<OnboardingScreen />} />
          
          {/* Protected Routes (wrapped in MainLayout) */}
          <Route path="/dashboard" element={<MainLayout><DashboardScreen /></MainLayout>} />
          <Route path="/checkin" element={<MainLayout><CheckInScreen /></MainLayout>} />
          <Route path="/support" element={<MainLayout><ChatScreen /></MainLayout>} />
          <Route path="/community" element={<MainLayout><CommunityFeedScreen /></MainLayout>} />
          <Route path="/breathing" element={<MainLayout><BreathingScreen /></MainLayout>} />
          <Route path="/vault" element={<MainLayout><VaultScreen /></MainLayout>} />
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
