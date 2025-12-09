# Guardian Dashboard - Complete Setup Guide

## Welcome! 👋

You now have a complete **Guardian Dashboard** - a real-time monitoring system for blind accessibility devices. This guide will get you up and running in minutes.

## What You Built

A full-stack TypeScript application with:
- **Frontend**: Next.js 14 + React + Tailwind CSS (http://localhost:3000)
- **Backend**: Node.js + Express + Socket.IO (http://localhost:5000)
- **Real-time Communication**: WebSocket for live updates
- **Responsive UI**: Works on desktop, tablet, and mobile

## System Requirements

- Node.js 18 or higher
- npm 9 or higher
- Any modern web browser
- 2 GB free disk space

## Installation Steps

### Step 1: Install Dependencies

#### Option A: Automatic (Recommended)

**macOS/Linux:**
```bash
cd /Users/chouhantej/guardian-dashboard-1
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
cd C:\Users\YourUsername\guardian-dashboard-1
setup.bat
```

#### Option B: Manual

**Backend:**
```bash
cd /Users/chouhantej/guardian-dashboard-1/backend
npm install
cp .env.example .env
```

**Frontend:**
```bash
cd /Users/chouhantej/guardian-dashboard-1/frontend
npm install
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=http://localhost:5000
EOF
```

### Step 2: Start Backend Service

Open Terminal 1 and run:
```bash
cd /Users/chouhantej/guardian-dashboard-1/backend
npm run dev
```

You should see:
```
Guardian Dashboard Backend running on http://localhost:5000
Frontend URL: http://localhost:3000
WebSocket enabled on ws://localhost:5000
```

✅ Backend is ready!

### Step 3: Start Frontend Application

Open Terminal 2 and run:
```bash
cd /Users/chouhantej/guardian-dashboard-1/frontend
npm run dev
```

You should see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local

 ✓ Ready in 3.2s
```

✅ Frontend is ready!

### Step 4: Open Dashboard

Visit: **http://localhost:3000**

You should see:
- Header with "Guardian" branding and connection status
- User card showing "Alex Chen" with battery 85%
- Live location map with animated pin
- Empty hazard timeline

## Features Guide

### 1. User Profile Card
Shows:
- User name: Alex Chen
- Active status indicator
- Battery level: 85%
- Current GPS coordinates
- Last seen timestamp

### 2. Live Location Map
- Animated pulsing location pin
- Real-time coordinates display
- Beautiful gradient background

### 3. Hazard Timeline
Click "+ Add Test" to see:
- Random hazard scenarios
- Severity levels (info, warning, high)
- Timestamps
- Beautiful color-coded cards

### 4. Emergency Button
Large red button that:
- Triggers emergency alert
- Shows device location
- Notifies guardians
- Can be confirmed/cancelled

## Real-time Features

### Auto-Updates (No Refresh Needed!)
- Location updates every 5 seconds
- New hazards broadcast every 15 seconds
- Connection status shown in header
- All changes appear instantly

### WebSocket Connection
The dashboard connects via WebSocket for:
- Instant hazard alerts
- Live location streaming
- Video frame updates
- SOS emergency signals

## Testing the System

### Test Hazard Detection
1. Click "+ Add Test" button
2. Watch hazard appear at top of timeline
3. See timestamp update automatically
4. Try multiple times to see variety

### Test Real-time Updates
1. Watch "Active X minutes ago" update
2. Watch location coordinates change
3. See connection status indicator

### Test Responsive Design
1. Press F12 (or Cmd+Option+I on Mac)
2. Click device toolbar icon
3. Switch between devices
4. See layout adjust automatically

## Useful Commands

### Development

**Backend:**
```bash
cd backend
npm run dev          # Start with hot reload
npm run build        # Build TypeScript
npm run type-check   # Check types without building
```

**Frontend:**
```bash
cd frontend
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run type-check   # Check types
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## File Structure Explained

```
guardian-dashboard-1/
│
├── backend/                      # Express + Node.js server
│   ├── src/
│   │   ├── index.ts             # Entry point, server setup
│   │   ├── types/               # TypeScript interfaces
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # Business logic
│   │   └── middleware/          # Error handlers
│   ├── package.json             # Dependencies
│   └── tsconfig.server.json     # TypeScript config
│
├── frontend/                     # Next.js React app
│   ├── src/
│   │   ├── app/                 # Pages & layout
│   │   ├── components/          # React components
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utilities
│   │   ├── store/               # State management
│   │   └── types/               # TypeScript types
│   ├── public/                  # Static files
│   ├── package.json             # Dependencies
│   └── next.config.js           # Next.js config
│
├── README.md                     # Full documentation
├── QUICKSTART.md                 # Quick reference
└── setup.sh/.bat                 # Automated setup
```

## API Reference

### Get User Information
```
GET /api/users/:userId
Response: { success: true, data: { name, location, battery, ... } }
```

### Get Hazards
```
GET /api/hazards?userId=demo-user&limit=50
Response: { success: true, data: [{ type, message, severity, ... }] }
```

### Create SOS Alert
```
POST /api/sos-alerts
Body: { userId, location, timestamp }
Response: { success: true, data: { id, resolved, ... } }
```

## Troubleshooting

### "Cannot find port 5000"
```bash
# Find what's using the port
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### "Cannot find port 3000"
```bash
lsof -i :3000
kill -9 <PID>
```

### "Module not found" errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### WebSocket connection fails
1. Check backend is running on 5000
2. Check frontend .env.local has correct URL
3. Try hard refresh (Ctrl+Shift+R)

### Components not loading
```bash
# Clear Next.js cache
rm -rf frontend/.next
npm run dev
```

## Deployment Guide

### Deploy Backend to Heroku

1. Create Heroku account at heroku.com
2. Install Heroku CLI
3. Run:
```bash
cd backend
heroku login
heroku create guardian-dashboard-api
git push heroku main
```

### Deploy Frontend to Vercel

1. Create Vercel account at vercel.com
2. Install Vercel CLI
3. Run:
```bash
cd frontend
vercel
```

### Deploy to AWS

**Backend (EC2):**
- Create EC2 instance
- Install Node.js
- Clone repo
- Run `npm install && npm run build && npm start`

**Frontend (S3 + CloudFront):**
- Build: `npm run build`
- Upload to S3
- Create CloudFront distribution

## Next Steps

### Ready to Customize?

1. **Change User Data**
   - Edit `backend/src/services/database.ts`
   - Modify user name, location, battery

2. **Add Your Branding**
   - Edit colors in `tailwind.config.ts`
   - Update icon and logo in `public/`

3. **Connect Real Hardware**
   - Add WebSocket handler for actual smart glasses
   - Receive real video frames and hazard data
   - Process with ML model

4. **Add Database**
   - Install MongoDB or PostgreSQL
   - Replace in-memory storage
   - Add authentication

5. **Mobile App**
   - Use React Native
   - Share TypeScript types with backend
   - Add notifications

## Performance Tips

1. **Use Production Build**
   ```bash
   npm run build
   npm start
   ```

2. **Optimize Images**
   - Use Next.js Image component
   - Compress assets

3. **Monitor Performance**
   ```bash
   # Frontend
   npm run build  # Check bundle size
   ```

## Security Checklist

- [ ] Add authentication (JWT)
- [ ] Validate all inputs
- [ ] Use HTTPS in production
- [ ] Add rate limiting
- [ ] Implement CORS properly
- [ ] Add logging & monitoring
- [ ] Use environment variables
- [ ] Keep dependencies updated

## Getting Help

### Documentation Files
- `README.md` - Full technical docs
- `QUICKSTART.md` - Quick reference
- This file - Complete setup guide

### Code Comments
Each file has detailed comments explaining the code.

### TypeScript Errors
- Check type definitions in `src/types/`
- Run `npm run type-check` to find issues
- Use your IDE's TypeScript checker

## Summary

You now have:
✅ Full-stack TypeScript application
✅ Real-time WebSocket communication
✅ Beautiful responsive UI
✅ API backend with data management
✅ Production-ready code structure

### What's Running
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- WebSocket: ws://localhost:5000

### Key Directories
- `frontend/src/` - React components & logic
- `backend/src/` - Express routes & services
- `frontend/public/` - Static files
- `backend/` - Server code

## Have Fun! 🚀

This dashboard is ready to:
- Monitor blind users with accessibility devices
- Detect and alert on hazards in real-time
- Track location and provide emergency features
- Scale to production with database integration

Start exploring the code, make it your own, and deploy it to help people!

---

**Questions?** Check the source code - it's all well-commented!
**Issues?** Review the Troubleshooting section above.
**Ready?** Visit http://localhost:3000 and start building!
