# 🧠 Low-Level Design (LLD) — Student-Teacher Booking App

## 🔧 Data Models (Firestore Collections)

### 🔹 users

```json
{
  uid: "userID",
  email: "user@example.com",
  role: "student" | "teacher" | "admin",
  approved: true
}
```

### 🔹 teachers

```json
{
  name: "John Doe",
  dept: "Physics",
  subject: "Quantum Mechanics"
}
```

### 🔹 bookings

```json
{
  studentId: "uid",
  teacherId: "tid",
  status: "pending" | "approved",
  timestamp: "2025-06-27T12:00:00Z"
}
```

### 🔹 logs

```json
{
  userId: "uid",
  action: "Login" | "Register" | "Booking",
  details: {
    actionMeta: "any optional data"
  },
  timestamp: "ISODate"
}
```

---

## 🔄 Control Flow Breakdown

### 🔸 Auth Flow

1. User attempts to login → Firebase Auth
2. If not found → creates new account
3. Saves user role (student/teacher)
4. Admin approves student (adds `approved: true`)

### 🔸 Booking Flow

1. Student logs in, selects teacher
2. Clicks "Book Appointment" → Firestore `bookings` entry created (pending)
3. Teacher logs in → sees list of bookings
4. Teacher clicks "Approve" → status updated

### 🔸 Admin Flow

1. Admin logs in
2. Loads unapproved students → approves them
3. Adds teachers manually

### 🔸 Logging Flow

* Each major action (login, register, booking, approval) calls `Logger.logAction()`
* Log entry pushed to Firestore `logs` collection

---

## 🧩 UI Component Breakdown

### Common:

* index.html: Base layout
* styles.css: Theme + cursor

### Scripts:

* `auth.js`: login/register logic
* `admin.js`: approval + teacher management
* `student.js`: teacher search + book
* `teacher.js`: view + approve bookings
* `logger.js`: logs actions to Firestore

---

## 🔄 Modular Principle

All core features are separated by role and maintainable.

* Functions are reusable and async/await driven.
* Logger is global and side-effect safe.
* Firestore structure allows for expansion (e.g., chat/messages later).

---

## ✅ LLD Status

✔️ Modular
✔️ Maintainable
✔️ Testable
✔️ Portable
✔️ Expandable
