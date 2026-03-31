# MediCare Clinic — MERN Stack

A full-stack clinic website built with **MongoDB, Express, React (Vite), and Node.js**, featuring a public-facing website and a password-protected admin panel.

---

## Project Structure

```
Clinic/
├── client/         ← React + Vite frontend (Tailwind CSS)
├── server.js       ← Express backend entry point
├── models/         ← Mongoose models
├── routes/         ← Express routes (appointments, admin)
├── middleware/     ← Error handler
├── .env            ← Environment variables
└── package.json    ← Server dependencies
```

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB running locally on default port (`27017`)

### 1. Start the Backend

```bash
# From project root
npm install
npm run dev
# → Server on http://localhost:5000
```

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
# → App on http://localhost:5173
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medicare
ADMIN_PASSWORD=admin123
```

> **Change `ADMIN_PASSWORD`** before deploying to production!

---

## Admin Panel

Visit `http://localhost:5173/admin` to log in.

**Default password:** `admin123`

Features:
- Stats dashboard (Total / Pending / Confirmed / Cancelled)
- View all appointment submissions
- Filter by status
- Update appointment status (Pending → Confirmed / Cancelled)
- Delete appointments

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET`  | `/api/health` | — | Health check |
| `POST` | `/api/appointments` | — | Submit new appointment |
| `POST` | `/api/admin/login` | — | Admin login (returns token) |
| `GET`  | `/api/admin/appointments` | Bearer token | Get all appointments + stats |
| `PATCH`| `/api/admin/appointments/:id` | Bearer token | Update appointment status |
| `DELETE`| `/api/admin/appointments/:id` | Bearer token | Delete appointment |
