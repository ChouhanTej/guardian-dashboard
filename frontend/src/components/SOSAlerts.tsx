'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { formatTime } from '@/lib/utils';
import { AlertTriangle, MapPin, Clock, Bell } from 'lucide-react';

export function SOSAlerts() {
  const { sosAlerts, resolveSOSAlert } = useDashboardStore();

  if (sosAlerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900">SOS Alerts</h3>
        <Bell size={20} className="text-red-600" />
      </div>
      {sosAlerts.map((alert) => (
        <div key={alert.id} className="border border-red-200 rounded-lg p-4 bg-red-50 mb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle size={16} />
              <span className="text-sm font-semibold">SOS Triggered</span>
            </div>
            <span className="text-xs text-red-600">{formatTime(new Date(alert.timestamp))}</span>
          </div>

          {alert.snapshot && (
            <div className="w-full h-32 bg-slate-300 rounded-lg mb-3 flex items-center justify-center text-slate-600 text-xs overflow-hidden">
              <img src={alert.snapshot} alt="SOS Snapshot" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="text-xs text-slate-700 mb-3 flex items-center space-x-1">
            <MapPin size={12} />
            <span>
              {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
            </span>
          </div>

          {!alert.resolved ? (
            <button
              onClick={() => resolveSOSAlert(alert.id)}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Respond to Alert
            </button>
          ) : (
            <div className="text-center text-sm text-green-600 font-medium py-2">Alert Resolved</div>
          )}
        </div>
      ))}
    </div>
  );
}
