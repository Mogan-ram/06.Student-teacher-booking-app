# 🏗️ System Architecture — Student-Teacher Booking App

## 🌐 Overview

A lightweight web app for booking appointments between students and teachers, managed by an admin. Fully serverless, powered by Firebase (backend) and Netlify (frontend).

---

## 🧱 Architecture Components

### 1. Frontend (Netlify hosted)

* HTML, CSS, JavaScript
* Role-based UI for Admin, Student, Teacher
* Dark mode + custom cursor

### 2. Firebase (Backend)

* Firebase Auth → Email/Password auth
* Firestore → NoSQL DB storing:

  * `users` (roles, approvals)
  * `teachers` (info)
  * `bookings` (appointments)
  * `logs` (activity tracking)

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
+----------------------------+
| Firestore: users/bookings  |
+----------------------------+
```

---

## 🔐 Security Model

* Firebase Auth handles session state
* Role saved in Firestore after registration
* Admin-only actions gated by `role === 'admin'`
* Optional: Firestore Security Rules can be added to restrict collection access

---

## 🚀 Hosting + Deployment

* **Frontend**: Netlify drag-and-drop deployment
* **Backend**: Firebase Console (no deployment needed)
* **Authorized Domains**: Netlify domain must be whitelisted in Firebase Auth settings

---

## ⚙️ Optimization Plan

* Async loading and minimal DOM reflows
* Modular JS structure avoids global state
* Future upgrades possible:

  * Chat/messaging
  * Calendar view
  * Notifications

---

## ✅ Architecture Status

✔️ Simple & Scalable
✔️ Serverless
✔️ Secure with Firebase
✔️ Portable
