# Guardian Dashboard - Getting Started

## Quick Start (5 minutes)

### 1. Run Setup Script

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

### 2. Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

Expected output:
```
Guardian Dashboard Backend running on http://localhost:5000
Frontend URL: http://localhost:3000
WebSocket enabled on ws://localhost:5000
```

### 3. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.0.0
- Local: http://localhost:3000
```

### 4. Open Dashboard
Visit: **http://localhost:3000**

## What You'll See

✅ **Header**: Guardian branding with connection status
✅ **User Card**: Alex Chen profile with battery 85%
✅ **Live Location**: Animated map pin showing current position
✅ **Hazard Timeline**: List of detected hazards (add test hazards!)
✅ **Emergency Button**: Red button for emergency calls

## Features to Try

1. **Add Test Hazards**
   - Click "+ Add Test" button
   - See random hazards appear instantly

2. **Live Updates**
   - Location updates every 5 seconds
   - Hazards broadcast via WebSocket

3. **Responsive Design**
   - Resize browser to see mobile layout
   - Perfect for monitoring on any device

## Troubleshooting

### Port Already in Use
```bash
# If port 5000 is taken (backend):
lsof -ti:5000 | xargs kill -9

# If port 3000 is taken (frontend):
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Type check only (no compilation)
npm run type-check

# Build to find all errors
npm run build
```

## Architecture Overview

```
┌─────────────────┐
│   Web Browser   │
│  (Next.js App)  │
└────────┬────────┘
         │ HTTP/WebSocket
         ↓
┌─────────────────┐
│ Express Server  │
│ + Socket.IO     │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
  Users    Hazards
  SOS       Video
```

## Backend Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:userId` | Get user info |
| POST | `/api/users/:userId/location` | Update location |
| GET | `/api/hazards` | Get hazards list |
| GET | `/api/sos-alerts` | Get SOS alerts |
| POST | `/api/sos-alerts` | Create SOS alert |
| PUT | `/api/sos-alerts/:id/resolve` | Resolve alert |

## Frontend Components

| Component | Purpose |
|-----------|---------|
| `Header` | Navigation & connection status |
| `UserCard` | Profile & quick info |
| `LocationMap` | Live location visualization |
| `HazardTimeline` | Hazard list & timeline |
| `SOSAlerts` | Emergency alerts |
| `EmergencyButton` | Call button |

## Data Flow

```
1. Frontend connects via WebSocket
2. Backend receives userId
3. Backend sends initial user data
4. Frontend displays in cards
5. Backend simulates hazards every 15s
6. WebSocket broadcasts to connected users
7. Frontend updates in real-time
```

## Next Steps

### Ready for Production?

1. **Add Database**
   - Replace in-memory storage in `backend/src/services/database.ts`
   - Support: MongoDB, PostgreSQL, Firebase

2. **Authentication**
   - Add JWT auth in middleware
   - Protect API routes
   - Secure WebSocket connections

3. **Real Video Integration**
   - Add video stream endpoint
   - Implement RTMP/HLS streaming
   - Process frames in backend

4. **Deployment**
   - Frontend: Vercel, Netlify, AWS
   - Backend: Heroku, Railway, AWS EC2

5. **Monitoring**
   - Add error logging (Sentry)
   - Set up uptime monitoring
   - Analytics tracking

## Support

- Check `README.md` for detailed documentation
- Review code comments for implementation details
- Open issues for bugs or feature requests

Happy coding! 🚀
