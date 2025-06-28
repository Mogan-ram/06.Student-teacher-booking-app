# 🏗️ System Architecture — Student-Teacher Booking App

## 🌐 Overview
A serverless web app for booking appointments between students and teachers, managed by an admin. Built with vanilla HTML, CSS, JS, and Firebase, hosted on Netlify.

---

## 🧱 Architecture Components

### 1. Frontend (Netlify hosted)
- HTML, CSS, JavaScript
- Role-based dashboards for Admin, Student, Teacher
- Features: Dark mode, custom orbiting cursor

### 2. Firebase (Backend)
- **Firebase Auth**: Email/Password authentication
- **Firestore**: NoSQL database storing:
  - `users` (roles, approvals, teacher details)
  - `bookings` (appointments)
  - `slots` (teacher availability)
  - `messages` (student-teacher communication)
  - `logs` (action tracking)

---

## 📊 Logical Diagram
```
          +----------------+
          |   index.html   |
          +----------------+
                   |
      +------------+-------------+
      |                          |
+------------+           +--------------+
|  auth.js   |           |  logger.js   |
+------------+           +--------------+
      |                          |
+------------+         +------------------+
| firebase-auth        |  firestore logs  |
+------------+         +------------------+
      |
+-------------------------------+
| student.js | teacher.js | admin.js |
+-------------------------------+
      |
+-------------------------------+
| Firestore: users/bookings/slots/messages |
+-------------------------------+
```

---

## 🔐 Security Model
- Firebase Auth manages user sessions
- Role-based access in Firestore (`role` in `users`)
- Admin-only actions gated by `role === 'admin'`
- Firestore Security Rules restrict collection access

---

## 🚀 Hosting + Deployment
- **Frontend**: Netlify (drag-and-drop deployment)
- **Backend**: Firebase Console (no deployment needed)
- **Authorized Domains**: Netlify domain whitelisted in Firebase Auth

---

## ⚙️ Optimization Plan
- Async loading minimizes DOM reflows
- Modular JS avoids global state
- Cached teacher data in local storage (future)
- Future upgrades:
  - Real-time notifications
  - Calendar view for slots
  - Email alerts for bookings/messages

---

## ✅ Architecture Status
✔️ Simple & Scalable
✔️ Serverless
✔️ Secure with Firebase
✔️ Portable

---

## 📐 Wireframes
- Stored in `docs/wireframes/` as images or PDF
- Includes layouts for admin, teacher, student dashboards