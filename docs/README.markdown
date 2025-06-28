# 📚 Student-Teacher Booking Appointment System

A web-based appointment system for students to book teacher appointments, managed by an admin, using Firebase as the backend. Built with vanilla HTML, CSS, and JS.

---

## 🚀 Features
- Firebase Authentication (Email/Password)
- Firestore database for storing users, bookings, slots, messages, and logs
- Role-based dashboards: Admin, Teacher, Student
- Appointment scheduling, booking, approval, and cancellation
- Student-teacher messaging
- Dark mode toggle and custom orbiting cursor 🌙🪐
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
│   ├── wireframes/
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
   - Paste your Firebase config inside `scripts/firebase-config.js`
4. **Run Locally**:
   - Open `index.html` in your browser
5. **Deploy on Netlify**:
   - Drag and drop the folder on [netlify.com](https://netlify.com)
   - Add the Netlify domain to Firebase Auth authorized domains

---

## 📈 Workflow
1. **Register**: Students/teachers register with email, password, name, and role. Admins auto-approve.
2. **Admin Approval**: Admins approve pending users or add/update/delete teachers.
3. **Scheduling**: Teachers add available slots (date/time).
4. **Booking**: Students search teachers, select available slots, and book appointments.
5. **Messaging**: Students send messages to teachers; teachers view messages.
6. **Approval/Cancellation**: Teachers approve or cancel bookings.
7. **Logging**: All actions (login, register, booking, etc.) are logged to Firestore.

---

## ✅ Roles & Permissions
| Role     | Permissions |
|----------|-------------|
| Admin    | Approve users, add/update/delete teachers |
| Teacher  | Add slots, view/approve/cancel bookings, view messages |
| Student  | Search teachers, book appointments, send messages |

---

## 📚 Documentation
- [LLD.md](docs/LLD.md): Low-Level Design
- [architecture.md](docs/architecture.md): System Architecture
- [test-cases.md](docs/test-cases.md): Manual test scenarios
- [wireframes/](docs/wireframes/): Dashboard layouts

---

## 🧪 Test Cases
See [test-cases.md](docs/test-cases.md) for full test scenarios covering auth, admin, student, teacher, and UI features.

---

## 🏗️ System Architecture
See [architecture.md](docs/architecture.md) for details on frontend, backend, security, and optimization.

---

## 🚀 Deployment
- Hosted on Netlify
- Backend managed via Firebase Console
- Ensure Netlify domain is whitelisted in Firebase Auth