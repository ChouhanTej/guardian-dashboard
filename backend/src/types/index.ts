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
  email?: string;
  phone?: string;
}

export interface Hazard {
  id: string | number;
  userId: string;
  type: string;
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'high';
  location: Location;
}

export interface SOSAlert {
  id: string | number;
  userId: string;
  timestamp: Date;
  location: Location;
  resolved: boolean;
  snapshot?: string;
  respondedAt?: Date;
}

export interface VideoFrame {
  timestamp: Date;
  frameData: string;
  hazardsDetected: Hazard[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
