import { Hazard } from '@/types/index';

export function formatTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'info':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function generateMockHazard(index: number): Hazard {
  const types = ['pothole', 'vehicle', 'stairs', 'crowd', 'construction'];
  const type = types[index % types.length];
  const messages: Record<string, string> = {
    pothole: 'Pothole detected on path',
    vehicle: 'Moving vehicle approaching',
    stairs: 'Stairs detected ahead',
    crowd: 'Crowded area detected',
    construction: 'Construction zone ahead',
  };

  const severities: Array<'info' | 'warning' | 'high'> = ['info', 'warning', 'high'];
  const severity = severities[index % severities.length];

  return {
    id: `hazard_${index}`,
    type,
    message: messages[type],
    timestamp: new Date(Date.now() - Math.random() * 3600000),
    severity,
    location: {
      lat: 19.076 + Math.random() * 0.01,
      lng: 72.8777 + Math.random() * 0.01,
    },
  };
}
