'use client';

import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Camera, Wifi, WifiOff, Volume2, VolumeX } from 'lucide-react';

export function VideoStream() {
  const { videoFrame, connectionStatus } = useDashboardStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // For demo: create a canvas with animated gradient to simulate video feed
  useEffect(() => {
    const canvas = document.getElementById('videoCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let hue = 0;
    const animate = () => {
      // Create animated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
      gradient.addColorStop(0.5, `hsl(${(hue + 60) % 360}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${(hue + 120) % 360}, 100%, 50%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some "visual noise" effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);

      // Add text overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('LIVE CAMERA FEED', canvas.width / 2, 40);

      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillText('Smart Glasses Camera - Real-time', canvas.width / 2, 70);

      // Add timestamp
      ctx.font = '12px monospace';
      ctx.fillText(new Date().toLocaleTimeString(), canvas.width / 2, canvas.height - 20);

      hue = (hue + 2) % 360;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleFullscreen = () => {
    const elem = document.getElementById('videoContainer') as HTMLElement;
    if (!document.fullscreenElement) {
      elem?.requestFullscreen().catch(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      id="videoContainer"
      className={`bg-white rounded-xl md:rounded-xl shadow-sm border border-slate-200 overflow-hidden ${
        isFullscreen ? 'fixed inset-0 rounded-none z-50' : ''
      }`}
    >
      {/* Header */}
      <div className="p-2 md:p-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-center space-x-2">
          <Camera size={18} className="md:w-5 md:h-5" />
          <div className="min-w-0">
            <h3 className="text-sm md:text-base font-semibold truncate">Live Camera</h3>
            <p className="text-xs opacity-75 hidden sm:block">Smart Glasses Stream</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          {connectionStatus === 'connected' ? (
            <div className="flex items-center space-x-1 px-2 py-1 rounded bg-green-500/20 text-green-300">
              <Wifi size={12} className="md:w-4 md:h-4 animate-pulse" />
              <span className="text-xs hidden sm:inline">Streaming</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 px-2 py-1 rounded bg-red-500/20 text-red-300">
              <WifiOff size={12} className="md:w-4 md:h-4" />
              <span className="text-xs hidden sm:inline">Offline</span>
            </div>
          )}
        </div>
      </div>

      {/* Video Canvas */}
      <div className="relative w-full bg-black aspect-video">
        <canvas
          id="videoCanvas"
          width={1280}
          height={720}
          className="w-full h-full block"
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-2 md:p-4 pointer-events-none">
          {/* Top Right - Info */}
          <div className="self-end text-white text-xs space-y-1 bg-black/30 rounded p-2">
            <div>📍 R5Q4+Q46</div>
            <div>🔋 85%</div>
          </div>

          {/* Bottom - Controls */}
          <div className="self-end flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-lg transition-colors ${
                isMuted
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              title="Fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 p-2 md:p-4 bg-slate-50 border-t border-slate-200">
        <div className="text-center">
          <div className="text-xs text-slate-600 mb-0.5">Resolution</div>
          <div className="text-xs md:text-sm font-semibold text-slate-900">1280x720</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-600 mb-0.5">FPS</div>
          <div className="text-xs md:text-sm font-semibold text-slate-900">30</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-600 mb-0.5">Latency</div>
          <div className="text-xs md:text-sm font-semibold text-slate-900">45ms</div>
        </div>
      </div>

      {/* Status Messages */}
      {isMuted && (
        <div className="p-2 md:p-3 bg-red-50 border-t border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <VolumeX size={14} className="flex-shrink-0" />
          <span>Audio muted</span>
        </div>
      )}

      {connectionStatus !== 'connected' && (
        <div className="p-2 md:p-3 bg-yellow-50 border-t border-yellow-200 text-yellow-700 text-xs flex items-center space-x-2">
          <WifiOff size={14} className="flex-shrink-0" />
          <span>Reconnecting...</span>
        </div>
      )}
    </div>
  );
}
