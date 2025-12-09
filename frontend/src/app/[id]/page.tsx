'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { UserCard } from '@/components/UserCard';
import { LocationMap } from '@/components/LocationMap';
import { EmergencyButton } from '@/components/EmergencyButton';
import { VideoStream } from '@/components/VideoStream';
import { useDashboardStore } from '@/store/dashboardStore';

export default function Dashboard() {
  const params = useParams();
  const userId = typeof params.id === 'string' ? params.id : 'demo-user';
  const { user } = useDashboardStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 md:pb-6">
      <Header userId={userId} />

      {/* Mobile Layout */}
      <div className="w-full px-3 md:px-4 py-3 md:py-6 space-y-3 md:space-y-6 md:max-w-7xl md:mx-auto">
        {/* Video Stream - Full Width */}
        <VideoStream />

        {/* Mobile: Single Column, Desktop: 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {/* Sidebar - appears below on mobile */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="space-y-3">
              <UserCard />
              <EmergencyButton />
            </div>
          </div>

          {/* Main Content - appears above sidebar on mobile */}
          <div className="md:col-span-2 space-y-3 md:space-y-6 order-1 md:order-2">
            <LocationMap />
          </div>
        </div>
      </div>
    </div>
  );
}
