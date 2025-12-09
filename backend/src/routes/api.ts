import express, { Router, Request, Response } from 'express';
import { usersDb, hazardsDb, sosAlertsDb } from '../services/database';
import { ApiResponse, User } from '../types/index';

const router = Router();

// Get user by ID
router.get('/users/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = usersDb.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      } as ApiResponse<null>);
    }

    res.json({
      success: true,
      data: user,
    } as ApiResponse<User>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Get hazards for a user
router.get('/hazards', (req: Request, res: Response) => {
  try {
    const { userId, limit = '50' } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'userId query parameter is required',
      });
    }

    const hazards = hazardsDb.get(userId) || [];
    const limitNum = Math.min(parseInt(limit as string) || 50, 100);

    res.json({
      success: true,
      data: hazards.slice(0, limitNum),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Get SOS alerts for a user
router.get('/sos-alerts', (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'userId query parameter is required',
      });
    }

    const alerts = sosAlertsDb.get(userId) || [];

    res.json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Create a new SOS alert
router.post('/sos-alerts', (req: Request, res: Response) => {
  try {
    const { userId, location, timestamp } = req.body;

    if (!userId || !location) {
      return res.status(400).json({
        success: false,
        error: 'userId and location are required',
      });
    }

    const alertId = `sos_${Date.now()}`;
    const newAlert = {
      id: alertId,
      userId,
      timestamp: new Date(timestamp || Date.now()),
      location,
      resolved: false,
    };

    const alerts = sosAlertsDb.get(userId) || [];
    alerts.unshift(newAlert);
    sosAlertsDb.set(userId, alerts);

    // Emit via WebSocket (requires socket manager instance)
    res.status(201).json({
      success: true,
      data: newAlert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Resolve SOS alert
router.put('/sos-alerts/:alertId/resolve', (req: Request, res: Response) => {
  try {
    const { alertId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required',
      });
    }

    const alerts = sosAlertsDb.get(userId) || [];
    const alert = alerts.find((a) => a.id === alertId);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found',
      });
    }

    alert.resolved = true;
    alert.respondedAt = new Date();

    res.json({
      success: true,
      message: 'Alert resolved',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Update user location
router.post('/users/:userId/location', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { location } = req.body;

    const user = usersDb.get(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    user.location = location;
    user.lastSeen = new Date();
    usersDb.set(userId, user);

    res.json({
      success: true,
      message: 'Location updated',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

export default router;
