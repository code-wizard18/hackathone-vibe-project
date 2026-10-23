import React, { useState } from 'react';
import { DisasterProvider, useDisaster } from './context/DisasterContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import OverviewDashboard from './components/views/OverviewDashboard';
import DepletionPredictor from './components/views/DepletionPredictor';
import CampBarter from './components/views/CampBarter';
import PriorityTokenSystem from './components/views/PriorityTokenSystem';
import CitizenQuickHelp from './components/views/CitizenQuickHelp';
import CampLayoutPlanner from './components/views/CampLayoutPlanner';
import SilentCampDetector from './components/views/SilentCampDetector';
import VolunteerMatching from './components/views/VolunteerMatching';
import SafeRouteNavigator from './components/views/SafeRouteNavigator';

function DashboardContent() {
  const { activeTab } = useDisaster();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#F5F0E8] flex flex-col font-sans selection:bg-[#D99055] selection:text-[#0B0A09]">
      {/* Sticky Navbar */}
      <Navbar 
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
        mobileMenuOpen={mobileMenuOpen}
      />

      <div className="flex-1 flex w-full">
        {/* Responsive Sidebar */}
        <Sidebar 
          mobileMenuOpen={mobileMenuOpen} 
          onCloseMobileMenu={() => setMobileMenuOpen(false)} 
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 p-4 lg:p-7 max-w-[1720px] mx-auto w-full transition-all">
          {activeTab === 'overview' && <OverviewDashboard />}
          {activeTab === 'depletion' && <DepletionPredictor />}
          {activeTab === 'barter' && <CampBarter />}
          {activeTab === 'tokens' && <PriorityTokenSystem />}
          {activeTab === 'citizen' && <CitizenQuickHelp />}
          {activeTab === 'planner' && <CampLayoutPlanner />}
          {activeTab === 'silent' && <SilentCampDetector />}
          {activeTab === 'volunteers' && <VolunteerMatching />}
          {activeTab === 'routes' && <SafeRouteNavigator />}

          {/* Mission Control Footer */}
          <footer className="mt-12 pt-6 border-t border-[#393027] text-xs font-mono text-[#A89F91] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#F5F0E8]">DisplaceOS</span>
              <span>— AI Disaster Relief Intelligence</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#221C18] border border-[#393027] text-[#D99055]">
                SIMULATED DATA
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Emergency Phase 2 Protocol</span>
              <span>• Zero Safety-Stock Violation Locked</span>
              <span className="text-[#35C98A]">● Mission Ready</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <DisasterProvider>
      <DashboardContent />
    </DisasterProvider>
  );
}
