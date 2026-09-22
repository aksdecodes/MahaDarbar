
<div align="center">

# 🇮🇳 Maharashtra Darbar
### Digital Food, Mess & Restaurant Management Platform

**स्वाद महाराष्ट्राचा, मान आपुलकीचा!**

*Authentic Maharashtrian Food • Mess Services • Digital Management*

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/Status-Competition%20Project-orange)

</div>

---

## 📌 About

**Maharashtra Darbar** is a full-stack platform that brings a traditional Maharashtrian food and mess business online — pairing a customer-facing food website with a secure admin management system.

Customers browse the menu, add items to a cart, order via WhatsApp, explore mess/tiffin plans, and find the restaurant. Admins manage members, payments, and grocery inventory from a protected dashboard.

> **Bring authentic Maharashtrian food closer to people, while making the business easier to run digitally.**

---

## 🎯 Problem & Approach

Students and professionals away from Maharashtra struggle to find authentic, affordable, accessible food — while mess/restaurant owners rely on manual member records, payment tracking, and grocery management.

Maharashtra Darbar solves both sides in one ecosystem:

```
                MAHARASHTRA DARBAR
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   CUSTOMER PLATFORM             ADMIN PLATFORM
   Menu · Cart · Contact         Members · Payments · Grocery
```

---

## 🚀 Features

### 🌐 Public Website
- **Homepage** — header, hero, menu highlights, mess section, gallery, reviews, location, footer
- **Hero Section** — Maharashtrian branding, Ganesh visual, CTAs
- **Digital Menu** — Thalis, combos, curries, paneer, Saoji specials, homestyle food
- **Shopping Cart** — add/remove items, adjust quantity, view subtotal
- **WhatsApp Ordering** — cart converts to a ready-to-send order message
- **Direct Contact** — call/WhatsApp buttons with restaurant numbers
- **Location & Directions** — address, map integration
- **Mess & Tiffin Services** — student plans, monthly plans, doorstep delivery
- **Customer Reviews** — name, rating, review, customer type
- **Menu Gallery** — visual showcase of dishes

### 🔐 Authentication
- Unified login screen with **Admin** / **Member** options
- Admin → redirected to `/dashboard`
- Member → customer login flow
- Public users cannot access admin routes

### 👨‍💼 Admin Dashboard
- **Member Management** — details, membership & payment status
- **Payment Management** — 🟢 Paid / 🔴 Due status tracking
- **Grocery & Inventory** — stock, usage, and remaining quantity tracking

---

## 🔄 User Flows

**Customer**
```
Visit → Homepage → Menu/Mess → Select Food → Cart → Order → WhatsApp/Contact
```

**Admin**
```
Login → Authenticate → Dashboard → Members / Payments / Groceries
```

---

## 🏗️ Architecture

```
        USER
          │
          ▼
  React + Vite (Frontend)
          │  REST API
          ▼
  Node.js + Express (Backend)
          │  Mongoose
          ▼
     MongoDB Atlas
```

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Vite, React Router, HTML5, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, MongoDB Atlas, Mongoose |
| **Tools** | VS Code, Git, GitHub, Postman, npm |
| **Deployment** | Render |

---

## 📁 Project Structure

```
MahaDarbar/
├── frontend/
│   ├── public/assets/        # images (ganesh_idol.jpg, menu images, etc.)
│   └── src/
│       ├── components/       # layout/, public/
│       ├── contexts/  hooks/  data/  layouts/  services/  styles/
│       ├── pages/             # admin/, public/
│       └── App.jsx  main.jsx  index.css
├── backend/
│   ├── controllers/  models/  routes/  middleware/  seed scripts/
│   └── app.js
└── .gitignore  README.md
```

---

## 🔒 Security

- Admin routes are protected and require authentication
- Sensitive config (DB URI, JWT secret, API keys) stored via environment variables — **never committed to GitHub**

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ⚙️ Installation

**1. Clone**
```bash
git clone https://github.com/aksdecodes/MahaDarbar
cd MahaDarbar
```

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
# runs at http://localhost:5173
```

**3. Backend**
```bash
cd backend
npm install
npm run dev   # or: npm start
```

**4. Production Build**
```bash
cd frontend
npm run build
# outputs to frontend/dist/
```

---

## 🌐 Deployment

```
Internet → React + Vite (Frontend) → Express API (Backend) → MongoDB Atlas
```

---

## 📱 Responsive Design

Fully responsive across **Desktop, Laptop, Tablet, and Mobile** — navigation, hero, menu cards, cart, mess section, reviews, location, and footer all adapt to screen size.

---

## 🎨 UI / UX

Inspired by Maharashtrian culture and hospitality:

`Deep Maroon/Burgundy` · `Saffron Accents` · `Warm Cream` · `Gold Details` · Rounded cards, food-focused imagery, strong typography, and clear CTAs.

---

## 🧩 Routes

| Route | Purpose |
|---|---|
| `/` | Public website |
| `/login` | Login / authentication |
| `/dashboard` | Admin dashboard |
| `/members` | Member management |
| `/members/:id` | Member details |
| `/groceries` | Grocery / inventory management |
| `/menu` | Food menu |
| `/menu/:category` | Category-specific menu |

---

## 🌱 Future Scope

- 💳 **Online Payments** — UPI, cards, net banking, payment gateway APIs
- 📦 **Order Management** — history, status, kitchen orders, tracking
- 👥 **Membership System** — subscriptions, auto-renewal, attendance, digital cards
- 🔔 **Notifications** — WhatsApp/SMS/email reminders
- 📦 **Inventory** — auto stock deduction, low-stock alerts, supplier & purchase management
- 📈 **Business Analytics** — sales, revenue, popular dishes, growth reports

---

## 🏆 Competition Project

| | |
|---|---|
| **Competition** | Coding Competition 2026 |
| **Team** | SoloDare |
| **Project** | Maharashtra Darbar |

---

## 💭 Why This Project Matters

Maharashtra Darbar isn't just a food-ordering site — it shows how technology can upgrade both **customer experience** (discovery → menu → ordering → communication) and **business operations** (members → payments → groceries → inventory) into one digital ecosystem.

---

## 📞 Contact

**Maharashtra Darbar**
Taza Kitchen Lane, East Srinivasa Colony, Ameerpet, Hyderabad, Telangana – 500038

📱 +91 7276826361 | +91 9021589596

---

## ⭐ Highlights

✓ React Frontend · ✓ Node.js + Express Backend · ✓ MongoDB Atlas · ✓ Responsive Design · ✓ Digital Menu & Cart · ✓ WhatsApp Ordering · ✓ Mess/Tiffin Info · ✓ Customer Reviews · ✓ Admin Auth & Dashboard · ✓ Member/Payment/Grocery Management · ✓ Cloud Deployment

---

<div align="center">

### 🇮🇳 Maharashtra Darbar
**स्वाद महाराष्ट्राचा, मान आपुलकीचा!**

Authentic Maharashtrian Food · Modern Digital Experience · Traditional Hospitality

**Built with ❤️ by Team SoloDare**
*Coding Competition 2026*

</div>
