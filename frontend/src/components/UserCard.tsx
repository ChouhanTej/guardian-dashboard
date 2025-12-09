'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { formatTime } from '@/lib/utils';
import { Clock, MapPin, Zap } from 'lucide-react';

export function UserCard() {
  const { user } = useDashboardStore();

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 animate-pulse">
        <div className="h-10 md:h-12 bg-slate-200 rounded-full mb-4 w-10 md:w-12"></div>
        <div className="h-4 bg-slate-200 rounded mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-4">
      <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
        <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:w-8 md:h-8"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm md:text-base font-semibold text-slate-900 truncate">{user.name}</h2>
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Clock size={10} className="md:w-3 md:h-3" />
            <span className="truncate">Active {formatTime(new Date(user.lastSeen))}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-3">
        <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
          <div className="text-xs text-slate-600 mb-0.5">Battery</div>
          <div className="flex items-center space-x-1 mt-0.5">
            <Zap size={12} className="md:w-4 md:h-4 text-yellow-600" />
            <span className="text-xs md:text-sm font-semibold text-slate-900">{user.battery}%</span>
          </div>
        </div>
        <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
          <div className="text-xs text-slate-600 mb-0.5">Status</div>
          <div className="text-xs md:text-sm font-semibold text-green-600 capitalize mt-0.5">{user.status}</div>
        </div>
      </div>

      <div className="p-2 md:p-3 bg-slate-50 rounded-lg">
        <div className="text-xs text-slate-600 mb-1">Location</div>
        <div className="flex items-start space-x-1 mb-1">
          <MapPin size={10} className="md:w-3 md:h-3 mt-0.5 flex-shrink-0" />
          <div className="text-xs font-mono text-slate-900 truncate">R5Q4+Q46</div>
        </div>
        <div className="flex items-start space-x-1">
          <MapPin size={10} className="md:w-3 md:h-3 mt-0.5 flex-shrink-0" />
          <div className="text-xs font-mono text-slate-900">
            {user.location.lat.toFixed(4)}, {user.location.lng.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}
