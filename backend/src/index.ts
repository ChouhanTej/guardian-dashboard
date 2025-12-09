import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import http from 'http';
import { config } from 'dotenv';

import { initializeDemoData } from './services/database';
import { SocketIOManager } from './services/socketManager';
import apiRoutes from './routes/api';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
config();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Create Express app
const app = express();

// Create HTTP server for WebSocket
const httpServer = http.createServer(app);

// Initialize Socket.IO
const socketManager = new SocketIOManager(httpServer);

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize demo data
initializeDemoData();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API routes
app.use('/api', apiRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Guardian Dashboard Backend running on http://localhost:${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
  console.log(`WebSocket enabled on ws://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
  });
});

// Simulate hazard detection for demo
setInterval(() => {
  const hazardTypes = [
    { type: 'pothole', message: 'Pothole detected on path', severity: 'warning' as const },
    { type: 'crowd', message: 'Crowded area - proceed with caution', severity: 'info' as const },
    { type: 'construction', message: 'Construction zone ahead', severity: 'high' as const },
    { type: 'vehicle', message: 'Moving vehicle approaching', severity: 'warning' as const },
  ];

  // Generate random hazard for demo user
  const randomHazard = hazardTypes[Math.floor(Math.random() * hazardTypes.length)];
  const hazard = {
    id: `hazard_${Date.now()}`,
    userId: 'demo-user',
    ...randomHazard,
    timestamp: new Date(),
    location: {
      lat: 19.076 + (Math.random() - 0.5) * 0.01,
      lng: 72.8777 + (Math.random() - 0.5) * 0.01,
    },
  };

  // Broadcast to connected user
  if (socketManager.isUserConnected('demo-user')) {
    socketManager.broadcastHazard('demo-user', hazard);
  }
}, 15000); // Every 15 seconds
