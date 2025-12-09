'use client';

import React, { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { apiClient } from '@/lib/apiClient';
import { Radio } from 'lucide-react';

export function Header({ userId }: { userId: string }) {
  const { connectionStatus, setUser } = useDashboardStore();
  const { socket } = useWebSocket(userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.getUser(userId);
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [userId, setUser]);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="w-full px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-6 md:h-6"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 truncate">Guardian</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Monitor</p>
            </div>
          </div>
          <div
            className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors flex-shrink-0 ${
              connectionStatus === 'connected'
                ? 'bg-green-50 text-green-700'
                : connectionStatus === 'connecting'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-red-50 text-red-700'
            }`}
          >
            <Radio
              size={14}
              className={`md:w-4 md:h-4 ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`}
            />
            <span className="text-xs md:text-sm font-medium capitalize hidden sm:inline">{connectionStatus}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
