'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { formatTime, getSeverityColor } from '@/lib/utils';
import { AlertTriangle, Clock, Plus } from 'lucide-react';

export function HazardTimeline() {
  const { hazards, addHazard } = useDashboardStore();
  const [isAdding, setIsAdding] = useState(false);

  const addTestHazard = () => {
    setIsAdding(true);
    const hazardTypes = [
      {
        type: 'pothole',
        message: 'Pothole detected on path',
        severity: 'warning' as const,
      },
      {
        type: 'crowd',
        message: 'Crowded area - proceed with caution',
        severity: 'info' as const,
      },
      {
        type: 'construction',
        message: 'Construction zone ahead',
        severity: 'high' as const,
      },
    ];

    const randomHazard = hazardTypes[Math.floor(Math.random() * hazardTypes.length)];

    addHazard({
      id: Date.now(),
      ...randomHazard,
      timestamp: new Date(),
      location: { lat: 19.076 + Math.random() * 0.01, lng: 72.8777 + Math.random() * 0.01 },
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-2 md:p-4 border-b border-slate-200 flex items-center justify-between gap-2">
        <h3 className="text-sm md:text-base font-semibold text-slate-900 truncate">Hazards</h3>
        <button
          onClick={addTestHazard}
          disabled={isAdding}
          className="text-xs md:text-sm text-blue-600 active:text-blue-700 font-medium hover:text-blue-800 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Plus size={14} className="md:w-4 md:h-4 inline mr-1" />
          Add Test
        </button>
      </div>

      <div className="p-2 md:p-4">
        {hazards.length === 0 ? (
          <p className="text-xs md:text-sm text-slate-500 text-center py-6 md:py-8">No hazards detected</p>
        ) : (
          <div className="space-y-2 md:space-y-3">
            {hazards.map((hazard) => (
              <div
                key={hazard.id}
                className={`border rounded-lg p-2 md:p-4 transition-all ${getSeverityColor(hazard.severity)}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <AlertTriangle size={14} className="md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs md:text-sm mb-1 break-words">{hazard.message}</p>
                      <div className="flex items-center space-x-2 md:space-x-3 text-xs">
                        <span className="flex items-center space-x-0.5">
                          <Clock size={10} className="md:w-3 md:h-3" />
                          <span className="truncate">{formatTime(new Date(hazard.timestamp))}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase px-1.5 md:px-2 py-0.5 md:py-1 rounded bg-white bg-opacity-50 ml-1 flex-shrink-0">
                    {hazard.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
