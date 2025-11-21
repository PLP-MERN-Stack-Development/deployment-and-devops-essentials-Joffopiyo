# 🚀 MERN Stack Deployment Demo

![Frontend CI](https://github.com/your-username/your-repo/actions/workflows/frontend-ci.yml/badge.svg)
![Backend CI](https://github.com/your-username/your-repo/actions/workflows/backend-ci.yml/badge.svg)
![Frontend CD](https://github.com/your-username/your-repo/actions/workflows/frontend-cd.yml/badge.svg)
![Backend CD](https://github.com/your-username/your-repo/actions/workflows/backend-cd.yml/badge.svg)

A production-ready MERN stack application demonstrating DevOps best practices, including CI/CD pipelines, monitoring, logging, and cloud deployment.

## 🌟 Features

- **Full Stack**: React frontend + Express/MongoDB backend.
- **CI/CD**: Automated testing and deployment via GitHub Actions.
- **Monitoring**: Real-time error tracking with Sentry and metrics with Prometheus.
- **Security**: Helmet, Rate Limiting, CORS, and Environment Variable management.
- **Performance**: Code splitting, Gzip compression, and caching strategies.
- **Logging**: Structured logging with Winston and daily rotation.

## 🛠 Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **DevOps**: GitHub Actions, Docker (optional), Vercel, Render
- **Monitoring**: Sentry, Prometheus, UptimeRobot

## 🚀 Live Demo

- **Frontend**: [https://your-frontend-app.vercel.app](https://your-frontend-app.vercel.app)
- **Backend API**: [https://deployment-and-devops-essentials-rjel.onrender.com/]

## 🏁 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/deployment-and-devops-essentials-Joffopiyo.git
   cd your-repo
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   SENTRY_DSN=your_sentry_dsn
   ```

4. **Run Locally**
   ```bash
   # Start Backend (http://localhost:5000)
   cd backend
   npm run dev

   # Start Frontend (http://localhost:3000)
   cd frontend
   npm start
   ```

## 🔄 CI/CD Pipelines

We use GitHub Actions for continuous integration and deployment.

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **Frontend CI** | Push/PR to `main`, `staging` | Lints, tests, and builds React app. |
| **Backend CI** | Push/PR to `main`, `staging` | Lints and tests Express app. |
| **Frontend CD** | Push to `main` | Deploys to Vercel. |
| **Backend CD** | Push to `main` | Deploys to Render. |

## 📊 Monitoring & Observability

- **Health Check**: `GET /health` returns system status and DB connection.
- **Metrics**: `GET /metrics` exposes Prometheus metrics.
- **Error Tracking**: Sentry captures unhandled exceptions in both frontend and backend.
- **Logs**: Application logs are stored in `backend/logs/` (local) or streamed to logging services (production).

## 📂 Project Structure

```
├── .github/workflows  # CI/CD configurations
├── backend            # Express application
│   ├── monitoring     # Logger config
│   ├── server.js      # Entry point
│   └── ...
├── frontend           # React application
│   ├── src            # Source code
│   └── ...
├── docs               # Runbooks and screenshots
└── ...
```

## 📖 Documentation

- [Deployment Runbook](docs/deployment-runbook.md)
- [Rollback Runbook](docs/rollback-runbook.md)

## 📄 License

This project is licensed under the MIT License.