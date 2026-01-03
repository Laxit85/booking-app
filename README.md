# 🏟️ Court / Turf Booking Web App

![GitHub Repo stars](https://img.shields.io/github/stars/Laxit85/booking-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/Laxit85/booking-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/Laxit85/booking-app)
![GitHub license](https://img.shields.io/github/license/Laxit85/booking-app)

A **modern, full-stack Court & Turf Booking application** that allows users to **view available courts**, **select time slots**, and **book seamlessly**.  
Designed with a **clean, premium UI** and a **secure backend**, suitable for production-ready deployment.

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication
- Secure password hashing
- Protected booking routes

### 📅 Booking System
- View available courts / turfs
- Date & time slot selection
- Real-time slot availability
- Book a slot with confirmation
- View user bookings (Upcoming / Completed)

### 🎨 UI / UX
- Modern, minimal, premium design
- Light & Dark theme with smooth animated toggle
- Micro-interactions and hover effects
- Mobile-first & fully responsive
- Animated preloader / splash screen

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- TypeScript
- Tailwind CSS
- Context API (Auth & Theme)
- Component-based architecture

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- RESTful APIs

---

## 📂 Project Structure
booking-app/
│
├── frontend/ # React + Tailwind frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── components/ # All UI components
│ │ │ ├── contexts/ # Auth & Theme Context
│ │ │ └── services/ # API calls
│ │ ├── main.tsx
│ │ └── vite-env.d.ts
│ ├── package.json
│ └── vite.config.ts
│
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── config/
│ │ │ └── db.js
│ │ ├── server.js
│ │ └── swagger.js
│ ├── package.json
│ └── .env.example
│
├── .gitignore
└── README.md
