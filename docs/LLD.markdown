# 🧠 Low-Level Design (LLD) — Student-Teacher Booking App

## 🔧 Data Models (Firestore Collections)

### 🔹 users
```json
{
  uid: "userID",
  email: "user@example.com",
  role: "student" | "teacher" | "admin",
  approved: true,
  name: "John Doe",
  dept: "Physics" (for teachers),
  subject: "Quantum Mechanics" (for teachers)
}
```

### 🔹 bookings
```json
{
  studentId: "uid",
  teacherId: "tid",
  slotId: "slotID",
  status: "pending" | "approved" | "cancelled",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  timestamp: "2025-06-28T12:00:00Z"
}
```

### 🔹 slots
```json
{
  teacherId: "tid",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  status: "available" | "booked",
  timestamp: "2025-06-28T12:00:00Z"
}
```

### 🔹 messages
```json
{
  studentId: "uid",
  teacherId: "tid",
  message: "Text message",
  timestamp: "2025-06-28T12:00:00Z"
}
```

### 🔹 logs
```json
{
  userId: "uid",
  action: "Login" | "Register" | "Booking" | "Approve" | "Cancel" | "AddSlot" | "SendMessage",
  details: {
    actionMeta: "any optional data"
  },
  timestamp: "2025-06-28T12:00:00Z"
}
```

---

## 🔄 Control Flow Breakdown

### 🔸 Auth Flow
1. User attempts to login → Firebase Auth
2. If not found → creates new account
3. Saves user role, name, and approval status in `users`
4. Admin approves student/teacher (`approved: true`)

### 🔸 Booking Flow
1. Teacher adds available slots to `slots` collection
2. Student logs in, searches teachers, views available slots
3. Student books a slot → creates `bookings` entry (pending)
4. Teacher views bookings, approves/cancels → updates status
5. Slot status updated to `booked`

### 🔸 Messaging Flow
1. Student selects teacher, sends message → saves to `messages`
2. Teacher views messages with student names

### 🔸 Admin Flow
1. Admin logs in
2. Approves pending users
3. Adds, updates, or deletes teachers in `users`

### 🔸 Logging Flow
- Every action (login, register, booking, approval, slot addition, messaging) calls `Logger.logAction()`
- Log entry saved in `logs` collection

---

## 🧩 UI Component Breakdown

### Common:
- `index.html`: Base layout
- `styles.css`: Theme + custom cursor

### Scripts:
- `auth.js`: Login/register logic
- `admin.js`: Approve users, manage teachers
- `student.js`: Search teachers, book appointments, send messages
- `teacher.js`: View/approve/cancel bookings, view messages, schedule slots
- `logger.js`: Logs actions to Firestore

---

## 🔄 Modular Principle
- Functions are role-specific, reusable, and async/await driven
- Logger is global and side-effect safe
- Firestore structure supports expansion (e.g., notifications, calendar view)

---

## ✅ LLD Status
✔️ Modular
✔️ Maintainable
✔️ Testable
✔️ Portable
✔️ Expandable