import { useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDashboardStore } from '@/store/dashboardStore';
import { Hazard, SOSAlert, VideoFrame } from '@/types/index';

export function useWebSocket(userId: string) {
  const socketRef = useRef<Socket | null>(null);
  const store = useDashboardStore();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000', {
      query: { userId },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      store.setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      store.setConnectionStatus('disconnected');
    });

    socket.on('hazard_detected', (hazard: Hazard) => {
      console.log('New hazard detected:', hazard);
      store.addHazard(hazard);
    });

    socket.on('sos_triggered', (alert: SOSAlert) => {
      console.log('SOS alert triggered:', alert);
      store.addSOSAlert(alert);
    });

    socket.on('location_update', (data: { lat: number; lng: number }) => {
      console.log('Location updated:', data);
      store.updateLocation(data.lat, data.lng);
    });

    socket.on('video_frame', (frame: VideoFrame) => {
      console.log('New video frame received');
      store.setVideoFrame(frame);
    });

    socket.on('error', (error: string) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, store]);

  const emitEvent = useCallback((event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return { socket: socketRef.current, emitEvent };
}
