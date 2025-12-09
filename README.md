# Guardian Dashboard

A real-time monitoring dashboard for blind accessibility devices with smart glasses. This dashboard displays live video feeds, hazard detection, location tracking, and emergency alert features.

## Project Structure

```
guardian-dashboard-1/
├── frontend/                 # Next.js React frontend
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API clients
│   │   ├── store/           # Zustand state management
│   │   └── types/           # TypeScript types
│   ├── public/              # Static files
│   ├── package.json         # Frontend dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── next.config.js       # Next.js config
│   └── tailwind.config.ts   # Tailwind CSS config
│
└── backend/                 # Node.js Express backend
    ├── src/
    │   ├── index.ts         # Entry point
    │   ├── types/           # TypeScript types
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   └── middleware/      # Express middleware
    ├── package.json         # Backend dependencies
    ├── tsconfig.server.json # TypeScript config
    └── .env.example         # Environment variables template
```

## Features

### Frontend
- **Real-time Dashboard**: Live monitoring of user status, battery, location
- **Interactive Map**: Shows current position with live location updates
- **Hazard Timeline**: Visual timeline of detected hazards with severity levels
- **SOS Alerts**: Emergency alert display with quick response buttons
- **Emergency Call Button**: Quick access to emergency contacts
- **WebSocket Integration**: Real-time updates via Socket.IO
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Progressive Web App**: Install as native app

### Backend
- **REST API**: Full CRUD operations for users, hazards, and SOS alerts
- **WebSocket Server**: Real-time bidirectional communication
- **Hazard Detection Simulation**: Demo hazard generation
- **Location Tracking**: Track and update user locations
- **SOS Management**: Handle emergency alerts
- **Database Layer**: In-memory storage (ready for DB integration)

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Real-time**: Socket.IO
- **CORS**: Enabled for frontend communication
- **Environment**: Dotenv

## Installation

### Prerequisites
- Node.js 18+ and npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. The dashboard loads with the demo user (`Alex Chen`)
3. You'll see:
   - User profile with battery and status
   - Live location map with pinging indicator
   - Hazard timeline with test data
   - Emergency call button

## API Endpoints

### Users
- `GET /api/users/:userId` - Get user details
- `POST /api/users/:userId/location` - Update user location

### Hazards
- `GET /api/hazards?userId=XXX&limit=50` - Get hazards for a user

### SOS Alerts
- `GET /api/sos-alerts?userId=XXX` - Get SOS alerts
- `POST /api/sos-alerts` - Create new SOS alert
- `PUT /api/sos-alerts/:alertId/resolve` - Resolve an alert

## WebSocket Events

### Emitted by Server
- `hazard_detected` - New hazard detected
- `sos_triggered` - SOS alert triggered
- `location_update` - Location updated
- `video_frame` - New video frame from device

### Listened by Client
- `hazard_detected` - Receives hazard data
- `sos_triggered` - Receives SOS alert
- `location_update` - Receives location updates
- `video_frame` - Receives video frames

## Development

### Frontend Commands
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript
```

### Backend Commands
```bash
npm run dev        # Start dev server with ts-node
npm run build      # Compile TypeScript
npm start          # Start compiled server
npm run type-check # Check TypeScript
```

## Configuration

### Environment Variables

**Backend (.env)**
```
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=http://localhost:5000
```

## Testing

### Mock Data
The backend automatically initializes with demo user data:
- User: Alex Chen
- Location: 19.076, 72.8777 (Mumbai area)
- Battery: 85%
- Status: Active

### Adding Test Hazards
Click the "+ Add Test" button in the Hazard Timeline section to add random test hazards.

## Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Heroku/Railway)
```bash
cd backend
npm run build
npm start
```

## Database Integration

Currently uses in-memory storage. To integrate with a real database:

1. Install database driver (MongoDB, PostgreSQL, etc.)
2. Replace implementations in `backend/src/services/database.ts`
3. Update models to match your schema

## Future Enhancements

- [ ] Real video stream integration
- [ ] Advanced hazard detection AI
- [ ] Multi-user support with guardians
- [ ] Persistent database (MongoDB/PostgreSQL)
- [ ] Authentication & Authorization
- [ ] Mobile app (React Native)
- [ ] Advanced analytics & reporting
- [ ] Historical data tracking
- [ ] Integration with emergency services
- [ ] Audio notifications

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
