'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import BrowseWorkers from '@/components/browse-workers';
import WorkerDetail from '@/components/worker-detail';
import ForWorkersSection from '@/components/for-workers-section';
import PricingSection from '@/components/pricing-section';
import DashboardSection from '@/components/dashboard-section';
import AIToolsSection from '@/components/ai-tools-section';

export default function Home() {
  const { currentView } = useAppStore();

  useEffect(() => {
    // Seed database on first load
    fetch('/api/seed').catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1" key={currentView}>
        {currentView === 'home' && <HeroSection />}
        {currentView === 'browse' && <BrowseWorkers />}
        {currentView === 'worker-detail' && <WorkerDetail />}
        {currentView === 'for-workers' && <ForWorkersSection />}
        {currentView === 'pricing' && <PricingSection />}
        {currentView === 'dashboard' && <DashboardSection />}
        {currentView === 'ai-tools' && <AIToolsSection />}
      </main>
      <Footer />
    </div>
  );
}