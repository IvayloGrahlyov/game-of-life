# Game of Life – Full Stack Setup

This project consists of:

- **Frontend:** Angular 20
- **Backend:** NestJS
- **Database:** MongoDB
- **Reverse Proxy (Docker only):** Nginx

## 📦 Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🖥 Running Locally (without Docker)

### 1. Start MongoDB

Make sure MongoDB is running locally.  
Default URI: `mongodb://localhost:27017`

### 2. Start Backend (NestJS)

```bash
cd game-of-life-api
npm install
npm run start:dev
```

- Runs on: `http://localhost:3030`
- Configure via `.env` (example below)
- Example `.env` in game-of-life-api:

```
MONGO_URI=mongodb://localhost:27017
PORT=3030
```

### 3. Start Frontend (Angular)

```bash
cd game-of-life
npm install
ng serve
```

- Runs on: http://localhost:4200
- The Angular dev server proxies /api to the Nest game-of-life-api.
- Example `proxy.conf.json` in game-of-life:

```json
{
  "/api/**": {
    "target": "http://0.0.0.0:3030",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": "/api/v1"
    }
  }
}
```

## 🐳 Running with Docker Compose

### 1. Build & Start

From the project root:

```bash
docker compose up --build
```

### 2. Access the App

Frontend (Angular via Nginx): http://localhost

Backend API: http://localhost/api

MongoDB: mapped to local port 27017 (default Mongo port)
