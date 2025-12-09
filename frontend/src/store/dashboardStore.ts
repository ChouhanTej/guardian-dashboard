import { create } from 'zustand';
import { AppState, User, Hazard, SOSAlert, VideoFrame } from '@/types/index';

interface DashboardStore extends AppState {
  setUser: (user: User) => void;
  updateLocation: (lat: number, lng: number) => void;
  addHazard: (hazard: Hazard) => void;
  clearHazard: (id: string | number) => void;
  addSOSAlert: (alert: SOSAlert) => void;
  resolveSOSAlert: (id: string | number) => void;
  setVideoFrame: (frame: VideoFrame) => void;
  setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  user: null,
  hazards: [],
  sosAlerts: [],
  videoFrame: null,
  connectionStatus: 'connecting',
  isLoading: true,

  setUser: (user) => set({ user }),
  
  updateLocation: (lat, lng) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            location: { lat, lng },
            lastSeen: new Date(),
          }
        : null,
    })),

  addHazard: (hazard) =>
    set((state) => ({
      hazards: [hazard, ...state.hazards].slice(0, 50),
    })),

  clearHazard: (id) =>
    set((state) => ({
      hazards: state.hazards.filter((h) => h.id !== id),
    })),

  addSOSAlert: (alert) =>
    set((state) => ({
      sosAlerts: [alert, ...state.sosAlerts],
    })),

  resolveSOSAlert: (id) =>
    set((state) => ({
      sosAlerts: state.sosAlerts.map((a) =>
        a.id === id ? { ...a, resolved: true } : a
      ),
    })),

  setVideoFrame: (frame) => set({ videoFrame: frame }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
