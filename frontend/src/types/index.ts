export interface Location {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  lastSeen: Date;
  status: 'active' | 'idle' | 'offline';
  location: Location;
  battery: number;
}

export interface Hazard {
  id: string | number;
  type: string;
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'high';
  location: Location;
}

export interface SOSAlert {
  id: string | number;
  timestamp: Date;
  location: Location;
  resolved: boolean;
  snapshot?: string;
}

export interface VideoFrame {
  timestamp: Date;
  frameData: string;
  hazardsDetected: Hazard[];
}

export interface AppState {
  user: User | null;
  hazards: Hazard[];
  sosAlerts: SOSAlert[];
  videoFrame: VideoFrame | null;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  isLoading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
