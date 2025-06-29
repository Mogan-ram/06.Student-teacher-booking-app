# 📚 Student-Teacher Booking Appointment System

A web-based appointment system for students to book teacher appointments, managed by an admin, using Firebase as the backend. Built with vanilla HTML, CSS, and JavaScript, hosted on Netlify.

## 🚀 Features
- **Firebase Authentication**: Email/password-based login and registration.
- **Firestore Database**: Stores users, bookings, slots, messages, and logs.
- **Role-Based Dashboards**:
  - **Admin**: Approve pending users, add/update/delete teachers.
  - **Teacher**: Add available slots, view/approve/cancel bookings, view messages.
  - **Student**: Search teachers, book appointments, send messages.
- **Appointment Scheduling**: Teachers set available slots; students book them.
- **Messaging**: Students send messages to teachers; teachers view them.
- **UI Enhancements**: Dark mode toggle, custom orbiting planet cursor.
- **Logging**: All user actions (login, booking, messaging) logged to Firestore.

## 🛠 Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Authentication, Firestore)
- **Hosting**: Netlify (frontend)
- **External Libraries**: Firebase JavaScript SDK (v10.12.0)

- **Live Demo**: [https://studbooking-teacher.netlify.app/](https://studbooking-teacher.netlify.app/)
## 📦 Project Structure
```
student-teacher-booking-app/
├── index.html              # Main HTML file
├── styles.css             # Custom CSS for layout and animations
├── scripts/               # JavaScript files
│   ├── firebase-config.js # Firebase initialization
│   ├── auth.js           # Authentication logic
│   ├── admin.js          # Admin dashboard functionality
│   ├── student.js        # Student dashboard functionality
│   ├── teacher.js        # Teacher dashboard functionality
│   ├── logger.js         # Action logging to Firestore
├── docs/                  # Documentation
│   ├── README.md         # Project overview (this file)
│   ├── LLD.md           # Low-Level Design
│   ├── architecture.md   # System Architecture
│   ├── test-cases.md    # Manual test scenarios
│   ├── wireframes/      # Dashboard layouts
│       └── wireframes.html # Static wireframe mockups
```

## 🔧 Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/student-teacher-booking-app.git
   ```
2. **Set Up Firebase**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
   - Enable Email/Password Authentication and Firestore Database.
   - Add your Web App and copy the Firebase config to `scripts/firebase-config.js`.
   - **Note**: For production, store sensitive keys in environment variables (e.g., Netlify environment variables) instead of hardcoding in `firebase-config.js`.
3. **Run Locally**:
   - Open `index.html` in a web browser (e.g., Chrome, Firefox).
   - Ensure an internet connection for Firebase connectivity.
4. **Deploy on Netlify**:
   - Drag and drop the project folder to [netlify.com](https://www.netlify.com).
   - Add the Netlify domain (e.g., `https://studbooking-teacher.netlify.app`) to Firebase Auth’s authorized domains.
4. **Firestore Security Rules**:
   - Configure rules in the Firebase Console to restrict access based on user roles (see `architecture.md`).

## 📈 Workflow
1. **Register**: Users sign up with email, password, name, and role (student, teacher, admin). Admins are auto-approved; others require admin approval.
2. **Login**: Authenticated users access role-specific dashboards.
2. **Admin**:
   - Approve pending students/teachers.
   - Add, update, or delete teachers with department and subject details.
3. **Teacher**:
   - Add available slots (date/time).
   - View, approve, or cancel student bookings.
   - View messages from students.
4. **Student**:
   - Search teachers by department/subject.
   - Book available slots (pending approval).
   - Send messages to teachers.
4. **Logging**: All actions (login, register, booking, approval, messaging) are logged to Firestore’s `logs` collection.

## ✅ Roles & Permissions
| Role     | Permissions |
|----------|-------------|
| Admin    | Approve users, add/update/delete teachers |
| Teacher  | Add slots, view/approve/cancel bookings, view messages |
| Student  | Search teachers, book appointments, send messages |

## 📚 Documentation
- **[LLD.md](docs/LLD.md)**: Low-Level Design with Firestore data models and control flows.
- **[architecture.md](docs/architecture.md)**: System architecture, security, and optimization.
- **[test-cases.md](docs/test-cases.md)**: Manual test scenarios for auth, roles, and UI.
- **[wireframes/wireframes.html](docs/wireframes/wireframes.html)**: Static mockups of admin, teacher, and student dashboards.

## 🧪 Test Cases
See [test-cases.md](docs/test-cases.md) for detailed scenarios covering:
- Authentication (login, register, unapproved user)
- Admin actions (approve users, manage teachers)
- Student actions (search, book, message)
- Teacher actions (add slots, manage bookings, view messages)
- UI features (dark mode, cursor)

## 🏗️ System Architecture
See [architecture.md](docs/architecture.md) for details on:
- Frontend (Netlify-hosted HTML/CSS/JS)
- Backend (Firebase Auth and Firestore)
- Security model (role-based access, Firestore rules)
- Optimization plans (async loading, future caching)

## 🚀 Deployment
- **Live Demo**: [https://studbooking-teacher.netlify.app/](https://studbooking-teacher.netlify.app/)
- **Frontend**: Hosted on Netlify.
- **Backend**: Managed via Firebase Console.
- **Note**: Ensure the Netlify domain is whitelisted in Firebase Auth’s authorized domains.



## 🛠 Future Enhancements
- Real-time notifications for booking approvals.
- Calendar view for teacher slots.
- Email alerts for bookings and messages.
- Local storage caching for teacher data.