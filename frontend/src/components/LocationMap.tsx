'use client';

import React, { useEffect, useRef } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { MapPin, Navigation } from 'lucide-react';

export function LocationMap() {
  const { user } = useDashboardStore();
  const mapIframeRef = useRef<HTMLIFrameElement>(null);

  // Target coordinates
  const TARGET_LAT = 12.839421;
  const TARGET_LNG = 80.155278;

  useEffect(() => {
    // Update iframe source when coordinates change
    if (mapIframeRef.current) {
      const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${TARGET_LNG - 0.01},${TARGET_LAT - 0.01},${TARGET_LNG + 0.01},${TARGET_LAT + 0.01}&layer=mapnik&marker=${TARGET_LAT},${TARGET_LNG}`;
      mapIframeRef.current.src = mapUrl;
    }
  }, []);

  const openInMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${TARGET_LAT},${TARGET_LNG}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-2 md:p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0">
          <MapPin size={16} className="md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
          <h3 className="text-sm md:text-base font-semibold text-slate-900 truncate">
            Live Location
          </h3>
        </div>
        <button
          onClick={openInMaps}
          className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium ml-2 flex-shrink-0"
          title="Open in Google Maps"
        >
          <Navigation size={14} className="md:w-4 md:h-4" />
        </button>
      </div>

      {/* Map Embed */}
      <div className="w-full h-64 md:h-80 bg-slate-100 overflow-hidden relative">
        <iframe
          ref={mapIframeRef}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          className="w-full h-full"
          title="Location Map"
        />
      </div>

      {/* Info Footer */}
      <div className="p-2 md:p-4 bg-gradient-to-r from-blue-50 to-slate-50 border-t border-slate-200 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-slate-600 mb-0.5 font-medium">Address</div>
            <div className="text-xs md:text-sm font-semibold text-slate-900">
              R5Q4+Q46 Mambakkam
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-600 mb-0.5 font-medium">Region</div>
            <div className="text-xs md:text-sm font-semibold text-slate-900">Tamil Nadu, India</div>
          </div>
        </div>

        {/* Coordinates Display */}
        <div className="p-2 md:p-3 bg-white rounded-lg border border-slate-200">
          <div className="text-xs text-slate-600 mb-1 font-medium">GPS Coordinates</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="font-mono text-slate-900">
              <span className="text-slate-600">Lat:</span> {TARGET_LAT.toFixed(6)}
            </div>
            <div className="font-mono text-slate-900">
              <span className="text-slate-600">Lng:</span> {TARGET_LNG.toFixed(6)}
            </div>
          </div>
        </div>

        {/* Current User Location */}
        {user && (
          <div className="p-2 md:p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-xs text-green-800 font-medium mb-1">Device Location</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="font-mono text-green-900">
                <span className="text-green-700">Lat:</span> {user.location.lat.toFixed(6)}
              </div>
              <div className="font-mono text-green-900">
                <span className="text-green-700">Lng:</span> {user.location.lng.toFixed(6)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
