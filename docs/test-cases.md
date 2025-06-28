# 🧪 Test Cases — Student-Teacher Booking App

Manual test scenarios to validate core functionality.

---

## 🔐 Auth Tests

| Test Case                   | Steps                                              | Expected Result                    |
| --------------------------- | -------------------------------------------------- | ---------------------------------- |
| Register new student        | Fill email/password, select "student", submit form | Student account created, logged in |
| Register new teacher        | Fill email/password, select "teacher", submit form | Teacher account created, logged in |
| Login as existing user      | Use valid email/password                           | Redirected to respective dashboard |
| Login with invalid password | Enter wrong credentials                            | Error message shown                |

---

## 👨‍🏫 Admin Tests

| Test Case                 | Steps                                   | Expected Result                  |
| ------------------------- | --------------------------------------- | -------------------------------- |
| Approve student           | Click "Load Pending", approve a student | User's `approved` field set true |
| Add new teacher           | Fill teacher form, click submit         | Teacher added to Firestore       |
| Reject unapproved student | Skip approval                           | Cannot login later               |

---

## 🎓 Student Tests

| Test Case        | Steps                   | Expected Result                     |
| ---------------- | ----------------------- | ----------------------------------- |
| Search teachers  | Click "Search Teachers" | List of teachers displayed          |
| Book appointment | Click "Book" button     | Booking saved with status 'pending' |

---

## 📅 Teacher Tests

| Test Case           | Steps                     | Expected Result              |
| ------------------- | ------------------------- | ---------------------------- |
| View appointments   | Click "View Appointments" | List of bookings shown       |
| Approve appointment | Click "Approve" button    | Status updated to 'approved' |

---

## 🌙 UI + Extras

| Test Case               | Steps                                     | Expected Result                |
| ----------------------- | ----------------------------------------- | ------------------------------ |
| Toggle dark mode        | Use dark mode switch                      | Theme changes to dark          |
| Orbiting cursor present | Move mouse                                | Planet cursor follows          |
| Logging in Firestore    | Perform any action (login, book, approve) | Log saved in `logs` collection |

---

## ✅ Status

✔️ Covers all role flows
✔️ Manual checklist complete
✔️ Validated on local and Netlify deploy
