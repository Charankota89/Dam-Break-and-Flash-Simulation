# Dam Flood Warning System

A simple web application to simulate dam breach flood water spread, check village evacuation times, and verify flood maps with satellite photos.

---

## Features

* **Live Flood Map**: View flood water spreading downstream frame-by-frame with timeline playback controls.
* **Village Evacuation Times**: Instant calculations showing how many hours nearby villages have before flood water arrives.
* **Satellite Photo Check**: Match simulated flood water boundaries against real Sentinel-1 satellite imagery.
* **AWS Cloud Connected**: AWS SNS emergency SMS alerts and AWS S3 disaster report backups.
* **Download Safety Report**: Printable PDF situation report for emergency planning.

---

## Project Architecture

* **Frontend**: React, TypeScript, MapLibre GL, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Cloud Services**: AWS SNS (Emergency SMS Alerts), AWS S3 (Disaster Report Backup)

---

## How to Run Locally

### 1. Start Node.js Express Backend (Port 8080)
```bash
cd backend
npm install
node server.js
```

### 2. Start React Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

### 3. One-Click Double Launcher
Simply double-click `run.bat` or run `.\run.ps1` in PowerShell to start both servers automatically!

---

## AWS Deployment Quick Start

1. **Frontend (AWS Amplify)**: Connect your GitHub repository to AWS Amplify for instant free hosting with a public web URL.
2. **Backend (AWS App Runner / EC2)**: Deploy the Node.js Express server to AWS App Runner or an EC2 instance.
