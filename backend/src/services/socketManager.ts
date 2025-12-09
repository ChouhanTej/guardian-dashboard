import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { User, Hazard, SOSAlert, VideoFrame } from '../types/index';

interface ConnectedUser {
  id: string;
  socketId: string;
}

export class SocketIOManager {
  private io: SocketIOServer;
  private connectedUsers: Map<string, ConnectedUser> = new Map();

  constructor(httpServer: HttpServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'],
    });

    this.setupMiddleware();
    this.setupConnectionHandlers();
  }

  private setupMiddleware() {
    this.io.use((socket, next) => {
      const userId = socket.handshake.query.userId as string;
      if (!userId) {
        return next(new Error('Invalid userId'));
      }
      socket.data.userId = userId;
      next();
    });
  }

  private setupConnectionHandlers() {
    this.io.on('connection', (socket) => {
      const userId = socket.data.userId as string;
      console.log(`User connected: ${userId} (Socket: ${socket.id})`);

      this.connectedUsers.set(userId, {
        id: userId,
        socketId: socket.id,
      });

      socket.emit('connected', { message: 'Successfully connected to Guardian Dashboard' });

      socket.on('disconnect', () => {
        this.connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId}`);
      });

      socket.on('location_update', (data: { lat: number; lng: number }) => {
        this.broadcastToUser(userId, 'location_update', data);
      });
    });
  }

  // Broadcast hazard detection to user
  broadcastHazard(userId: string, hazard: Hazard) {
    const user = this.connectedUsers.get(userId);
    if (user) {
      this.io.to(user.socketId).emit('hazard_detected', hazard);
      console.log(`Hazard broadcasted to ${userId}:`, hazard.message);
    }
  }

  // Broadcast SOS alert to user and guardians
  broadcastSOSAlert(userId: string, alert: SOSAlert) {
    const user = this.connectedUsers.get(userId);
    if (user) {
      this.io.to(user.socketId).emit('sos_triggered', alert);
      console.log(`SOS Alert broadcasted for ${userId}`);
    }
  }

  // Broadcast video frame
  broadcastVideoFrame(userId: string, frame: VideoFrame) {
    const user = this.connectedUsers.get(userId);
    if (user) {
      this.io.to(user.socketId).emit('video_frame', frame);
    }
  }

  // Broadcast location update
  broadcastLocationUpdate(userId: string, location: { lat: number; lng: number }) {
    const user = this.connectedUsers.get(userId);
    if (user) {
      this.io.to(user.socketId).emit('location_update', location);
    }
  }

  // Broadcast to specific user
  private broadcastToUser(userId: string, event: string, data: any) {
    const user = this.connectedUsers.get(userId);
    if (user) {
      this.io.to(user.socketId).emit(event, data);
    }
  }

  // Get IO instance
  getIO() {
    return this.io;
  }

  // Check if user is connected
  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }
}
