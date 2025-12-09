import { User, Hazard, SOSAlert, VideoFrame } from './index';

// In-memory databases (replace with actual DB in production)
export const usersDb: Map<string, User> = new Map();
export const hazardsDb: Map<string, Hazard[]> = new Map();
export const sosAlertsDb: Map<string, SOSAlert[]> = new Map();
export const videoFramesDb: Map<string, VideoFrame[]> = new Map();

// Initialize demo user
export function initializeDemoData() {
  const demoUser: User = {
    id: 'demo-user',
    name: 'Alex Chen',
    lastSeen: new Date(),
    status: 'active',
    location: { lat: 12.6857, lng: 79.8711 },
    battery: 85,
    email: 'alex.chen@example.com',
    phone: '+1-555-0123',
  };

  usersDb.set('demo-user', demoUser);

  const demoHazards: Hazard[] = [
    {
      id: '1',
      userId: 'demo-user',
      type: 'obstacle',
      message: 'Obstacle detected ahead - 2 meters',
      timestamp: new Date(Date.now() - 120000),
      severity: 'warning',
      location: { lat: 12.6857, lng: 79.8711 },
    },
    {
      id: '2',
      userId: 'demo-user',
      type: 'vehicle',
      message: 'Moving vehicle approaching from left',
      timestamp: new Date(Date.now() - 300000),
      severity: 'high',
      location: { lat: 12.6857, lng: 79.8711 },
    },
  ];

  hazardsDb.set('demo-user', demoHazards);

  const demoSOSAlerts: SOSAlert[] = [];
  sosAlertsDb.set('demo-user', demoSOSAlerts);
}
