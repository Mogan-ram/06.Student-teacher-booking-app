# 🧪 Test Cases — Student-Teacher Booking App

Manual test scenarios to validate core functionality.

---

## 🔐 Auth Tests
| Test Case                   | Steps                                              | Expected Result                    |
| --------------------------- | -------------------------------------------------- | ---------------------------------- |
| Register new student        | Fill email/password, select "student", submit form | Student account created, pending approval |
| Register new teacher        | Fill email/password, select "teacher", submit form | Teacher account created, pending approval |
| Login as existing user      | Use valid email/password                           | Redirected to respective dashboard |
| Login with invalid password | Enter wrong credentials                            | Error message shown                |
| Login unapproved user       | Login as unapproved student/teacher                | "Pending approval" message shown   |

---

## 👨‍🏫 Admin Tests
| Test Case                 | Steps                                   | Expected Result                  |
| ------------------------- | --------------------------------------- | -------------------------------- |
| Approve student           | Click "Load Pending", approve a student | User's `approved` field set true |
| Add new teacher           | Fill teacher form, click submit         | Teacher added to `users`         |
| Update teacher            | Click "Load Teachers", update details   | Teacher data updated in `users`  |
| Delete teacher            | Click "Load Teachers", delete teacher   | Teacher removed from `users`     |
| Reject unapproved student | Skip approval                           | Cannot login later               |

---

## 🎓 Student Tests
| Test Case        | Steps                   | Expected Result                     |
| ---------------- | ----------------------- | ----------------------------------- |
| Search teachers  | Click "Search Teachers" | List of teachers displayed          |
| Book appointment | Click "Book" button     | Booking saved with status 'pending' |
| Send message     | Select teacher, send message | Message saved in `messages` collection |

---

## 📅 Teacher Tests
| Test Case           | Steps                     | Expected Result              |
| ------------------- | ------------------------- | ---------------------------- |
| Add slot            | Fill date/time, submit    | Slot saved in `slots` collection |
| View appointments   | Click "View Appointments" | List of bookings shown with student names |
| Approve appointment | Click "Approve" button    | Status updated to 'approved' |
| Cancel appointment  | Click "Cancel" button    | Status updated to 'cancelled' |
| View messages       | Click "View Messages"     | List of messages shown with student names |

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