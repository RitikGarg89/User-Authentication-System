# 🚀 MERN Stack Authentication System

A premium, full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js). This project features a modern, responsive UI with glassmorphism effects, secure JWT-based authentication, and email OTP verification.

![Premium UI Mockup](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop)

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login system with hashed passwords using BcryptJS.
- **📧 Email Verification**: Mandatory OTP verification via email for account activation using Nodemailer.
- **🎨 Premium UI/UX**: Stunning interface with glassmorphism, smooth animations (Framer Motion), and responsive layouts (Tailwind CSS).
- **📝 Comprehensive Registration**: Collects user details including name, email, mobile, gender, state, and pincode.
- **🛡️ Protected Routes**: Client-side and server-side route protection for authenticated users.
- **🔔 Real-time Notifications**: Clean toast notifications for user feedback using React Hot Toast.
- **👤 Profile Management**: Fetch and display authenticated user data.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI component library.
- **Tailwind CSS**: Utility-first styling.
- **Framer Motion**: Fluid animations and transitions.
- **React Router 7**: Sophisticated client-side routing.
- **Lucide React**: Beautiful icons.
- **Axios**: HTTP client for API requests.

### Backend
- **Node.js & Express**: Scalable server-side logic.
- **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
- **JWT**: Secure token-based authentication.
- **Nodemailer**: Email service for OTP delivery.
- **BcryptJS**: Industry-standard password hashing.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RitikGarg89/User-Authentication-System.git
   cd User-Authentication-System
   ```

2. **Server Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Client Setup**
   ```bash
   cd ../client
   npm install
   ```

### Running the App

1. **Start the Backend**
   ```bash
   cd server
   npm start
   ```

2. **Start the Frontend**
   ```bash
   cd client
   npm start
   ```

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user & send OTP |
| `POST` | `/api/auth/verify-otp` | Verify user email with OTP |
| `POST` | `/api/auth/login` | Login user & return JWT |
| `GET` | `/api/auth/me` | Get current user profile (Protected) |
| `GET` | `/api/auth/dashboard` | Access dashboard data (Protected) |

## 🎨 UI Preview

The application uses a **Glassmorphism Design Language** featuring:
- Semi-transparent blurred backgrounds
- Vibrant mesh gradients
- High-contrast typography (Inter/Outfit)
- Interactive hover states

---

Developed with ❤️ by [Ritik Garg](https://github.com/RitikGarg89)
