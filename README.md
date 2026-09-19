# Maharashtra Darbar – Mess Management System

A professional, full-stack Admin Dashboard for managing mess members and their fee validity.

**Tech Stack:** React + Vite · Node.js + Express · MongoDB + Mongoose · JWT Auth

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally **OR** a MongoDB Atlas URI

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file (already created at `backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/maharashtrian_darbar
JWT_SECRET=your_very_long_random_secret_key_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

> **MongoDB Atlas:** Replace `MONGODB_URI` with your Atlas connection string:
> `MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/maharashtrian_darbar`

**Seed demo data (30 members, payment history):**
```bash
npm run seed
```

**Start the backend server:**
```bash
npm run dev        # development (nodemon auto-reload)
npm start          # production
```

Backend runs on: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔑 Default Admin Credentials

After running `npm run seed`:

| Field | Value |
|-------|-------|
| Email | `admin@maharashtriandarbar.com` |
| Password | `Admin@123` |

---

## 📁 Project Structure

```
maharashtrian-darbar/
├── backend/
│   ├── src/
│   │   ├── config/         # MongoDB connection
│   │   ├── controllers/    # Route handler logic
│   │   ├── middleware/     # JWT auth, error handler
│   │   ├── models/         # Mongoose schemas (Admin, Member, Payment)
│   │   ├── routes/         # Express routers
│   │   └── utils/          # Member ID generator, status calculator
│   ├── app.js
│   ├── server.js
│   ├── seed.js             # Demo data seeder
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI (Button, Modal, Badge, Toast...)
│   │   ├── contexts/       # AuthContext, ToastContext
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # DashboardLayout, AuthLayout
│   │   ├── pages/          # Login, Dashboard, Members, MemberDetail
│   │   ├── services/       # API service functions (axios)
│   │   └── utils/          # Date formatters, validators
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🎯 Features

### Authentication
- Admin login with JWT
- Protected routes
- bcrypt password hashing

### Dashboard
- Live stats: Total Members · Active · Fees Due
- Recent members table
- Members with fees due list

### Member Management
- Full members table with green 🟢 / red 🔴 status dots
- Search by name, mobile, or member ID
- Filter: All · Active · Fees Due
- Sorting and pagination (10 / 20 / 50 per page)
- Add new member with membership type selection (Regular/Special/Premium)
- Edit member details
- Soft delete (preserves payment history)

### Fee Management
- Mark Fee Paid modal with real-time validity preview
- Smart extension: if currently active → extends from valid-till date
- Complete payment history per member
- Payment modes: Cash / UPI / Bank Transfer / Cheque

### Status Calculation
- **ACTIVE**: latest payment validTill ≥ today
- **DUE**: no payment, or validTill < today
- Calculated on-the-fly; never stored as a static field

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Current admin info |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/members` | List members (search/filter/paginate) |
| POST | `/api/members` | Create member |
| GET | `/api/members/:id` | Member details |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Soft delete member |
| GET | `/api/members/:id/payments` | Member payment history |
| POST | `/api/members/:id/payments` | Record payment |

All endpoints except `/api/auth/login` require `Authorization: Bearer <token>`.

---

## 💾 Database Models

### Member
```js
{ memberId, name, mobile, email, address, joiningDate, monthlyFee, membershipType, isActive }
```

### Payment
```js
{ member (ref), amount, paymentDate, validFrom, validTill, status, paymentMode, notes }
```

### Admin
```js
{ name, email, password (hashed), role }
```

---

## 🔒 Security

- Passwords hashed with bcryptjs (10 rounds)
- JWT tokens expire in 7 days
- All member/payment routes protected by JWT middleware
- CORS restricted to frontend origin
- No secrets in frontend code — all in `.env`

---

## 🔮 Future Modules (Planned)

The architecture is structured to easily add:
- Grocery & Inventory Management
- Suppliers
- Workers & Attendance
- Worker Salaries
- Expenses
- Meal Management
- Financial Reports & Analytics
- Online Payments & Receipts
- Notifications

---

## 📝 Environment Variables

### backend/.env.example
```env
MONGODB_URI=mongodb://localhost:27017/maharashtrian_darbar
JWT_SECRET=your_very_long_random_secret_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

*Built for Maharashtra Darbar Mess — MVP v1.0*
