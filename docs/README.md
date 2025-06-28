# 📚 Student-Teacher Booking Appointment System

A simple web-based appointment system that allows students to book appointments with teachers, managed by an admin, using Firebase as backend. Built with vanilla HTML, CSS, and JS.

---

## 🚀 Features
- Firebase Authentication (Email/Password)
- Firestore database for storing users, teachers, and bookings
- Role-based dashboards: Admin, Teacher, Student
- Appointment booking and approval flow
- Dark mode toggle and fun custom cursor 🌙🪐
- Logging of all user actions to Firestore

---

## 🛠 Technologies Used
- HTML, CSS, JavaScript
- Firebase (Auth, Firestore)
- Netlify (for frontend hosting)

---

## 📦 Project Structure
```
student-teacher-booking-app/
├── index.html
├── styles.css
├── scripts/
│   ├── firebase-config.js
│   ├── auth.js
│   ├── admin.js
│   ├── student.js
│   ├── teacher.js
│   ├── logger.js
├── docs/
│   ├── README.md
│   ├── LLD.md
│   ├── architecture.md
│   ├── test-cases.md
```

---

## 🔧 Setup Instructions

1. **Clone the repo**:
```bash
git clone https://github.com/yourusername/student-teacher-booking-app.git
```

2. **Set up Firebase**:
- Create a Firebase project
- Enable Firestore and Email/Password Authentication
- Add your Web App and get the config keys

3. **Fill `firebase-config.js`**:
Paste your Firebase config inside `scripts/firebase-config.js`.

4. **Run Locally**:
Open `index.html` in your browser directly.

5. **Deploy on Netlify**:
- Drag and drop the folder on [netlify.com](https://netlify.com)
- Add the Netlify domain to Firebase Auth authorized domains

---

## ✅ Roles & Permissions
| Role     | Permissions |
|----------|-------------|
| Admin    | Approve students, Add/Update/Delete teachers |
| Teacher  | View appointments, Approve/Reject bookings |
| Student  | Book appointments, Search teachers, View status |

---

## 📚 Documentation
- [LLD.md](docs/LLD.md): Low-Level Design
- [architecture.md](docs/architecture.md): System Architecture
- [test-cases.md](docs/test-cases.md): Manual test scenarios

---

## 🧠 Low-Level Design (LLD)

### Data Collections (Firestore)

**users**
```json
{
  uid: "userID",
  email: "user@example.com",
  role: "student" | "teacher" | "admin",
  approved: true
}
```

**teachers**
```json
{
  name: "John Doe",
  dept: "Physics",
  subject: "Quantum Mechanics"
}
```

**bookings**
```json
{
  studentId: "uid",
  teacherId: "tid",
  status: "pending" | "approved",
  timestamp: ISODate
}
```

**logs**
```json
{
  userId: "uid",
  action: "Login" | "Register" | "Booking",
  details: { ... },
  timestamp: ISODate
}
```

### Flow:
1. User registers/logs in → Auth + Firestore entry
2. Admin approves students
3. Teacher added manually by admin
4. Student searches teacher and books slot
5. Teacher approves booking
6. Every major action logged

---

## 🧱 System Architecture (Overview)
```
Frontend (HTML/CSS/JS)
  ↳ Firebase SDK
    ↳ Auth
    ↳ Firestore (users, bookings, logs)

Frontend hosted on Netlify
Firebase backend (no server required)
```

---

## 🧪 Test Cases
| Feature           | Action                           | Expected Result                            |
|------------------|----------------------------------|--------------------------------------------|
| Register/Login    | Use email + password             | User logged in, redirected to dashboard    |
| Role-based UI     | Login as student/teacher/admin   | Correct dashboard shown                    |
| Book Appointment  | Student books slot               | Booking stored in Firestore with pending   |
| Approve Booking   | Teacher approves booking         | Status changes to approved in Firestore    |
| Admin Functions   | Approve students, add teachers   | Data updated in users/teachers collections |
| Dark Mode         | Toggle switch                    | Theme toggles light/dark                   |
| Logging           | Perform any action               | Log appears in `logs` collection           |

---


