'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { apiClient } from '@/lib/apiClient';
import { Phone } from 'lucide-react';

export function EmergencyButton() {
  const { user } = useDashboardStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSOS = async () => {
    if (!user) return;

    const confirmed = confirm(
      `Emergency Call for ${user.name}?\n\nLocation:\n${user.location.lat.toFixed(
        4
      )}, ${user.location.lng.toFixed(4)}`
    );

    if (confirmed) {
      setIsLoading(true);
      try {
        await apiClient.triggerSOS(user.id, user.location);
        alert('Emergency call initiated and emergency contacts notified!');
      } catch (error) {
        console.error('Failed to trigger SOS:', error);
        alert('Failed to trigger emergency call. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleSOS}
      disabled={isLoading || !user}
      className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 text-white font-semibold py-2.5 md:py-3 px-3 md:px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
    >
      <Phone size={18} className="md:w-5 md:h-5" />
      <span className="text-sm md:text-base">{isLoading ? 'Calling...' : 'Emergency Call'}</span>
    </button>
  );
}
