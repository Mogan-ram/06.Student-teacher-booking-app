import { db, auth } from './firebase-config.js';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { Timestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import Logger from './logger.js';

const dashboard = document.getElementById('dashboard');

export async function loadStudentDashboard() {
  dashboard.innerHTML = `
    <h3>🎓 Student Dashboard</h3>
    <button id="loadTeachers">Search Teachers</button>
    <div id="teacherList"></div>
    <h4>Send Message to Teacher</h4>
    <form id="sendMessageForm">
      <select id="teacherSelect" required>
        <option value="">Select Teacher</option>
      </select>
      <textarea id="messageText" placeholder="Enter your message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
    <div id="messageStatus"></div>
  `;

  document.getElementById('loadTeachers').addEventListener('click', loadTeachers);
  document.getElementById('sendMessageForm').addEventListener('submit', handleSendMessage);

  try {
    const teacherQuery = query(collection(db, 'users'), where('role', '==', 'teacher'));
    const teacherSnap = await getDocs(teacherQuery);
    const teacherSelect = document.getElementById('teacherSelect');
    teacherSnap.forEach(doc => {
      const option = document.createElement('option');
      option.value = doc.id;
      option.textContent = doc.data().name;
      teacherSelect.appendChild(option);
    });
  } catch (err) {
    Logger.error('Error loading teachers for dropdown: ' + err.message);
    document.getElementById('messageStatus').textContent = `Error: ${err.message}`;
  }
}

async function loadTeachers() {
  const list = document.getElementById('teacherList');
  list.innerHTML = '<em>Loading teachers...</em>';

  try {
    const q = query(collection(db, 'users'), where('role', '==', 'teacher'));
    const querySnap = await getDocs(q);
    const teachers = [];

    querySnap.forEach(docSnap => {
      const data = docSnap.data();
      teachers.push({ id: docSnap.id, ...data });
    });

    list.innerHTML = teachers.length
      ? teachers.map(t => `
          <div>
            <strong>${t.name}</strong> | ${t.dept} | ${t.subject}
            <button onclick="bookWithTeacher('${t.id}')">Book Appointment 📅</button>
          </div>`).join('')
      : '<p>No teachers available</p>';
  } catch (err) {
    Logger.error('Error loading teachers: ' + err.message);
    list.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

window.bookWithTeacher = async function bookWithTeacher(teacherId) {
  if (!auth.currentUser) {
    alert('Error: User not authenticated. Please log in again.');
    Logger.error('Booking failed: User not authenticated');
    return;
  }

  const uid = auth.currentUser.uid;
  console.log('Booking attempt:', { studentId: uid, teacherId });

  try {
    const q = query(collection(db, 'slots'), where('teacherId', '==', teacherId), where('status', '==', 'available'));
    const snap = await getDocs(q);
    const slots = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (slots.length === 0) {
      alert('No available slots for this teacher.');
      Logger.logAction(uid, 'BookingAttempt', { teacherId, result: 'No slots available' });
      return;
    }

    const slot = slots[0]; // For simplicity, select the first available slot
    console.log('Selected slot:', slot);

    const bookingData = {
      studentId: uid,
      teacherId,
      slotId: slot.id,
      status: 'pending',
      date: slot.date,
      time: slot.time,
      timestamp: Timestamp.fromDate(new Date())
    };
    console.log('Creating booking:', bookingData);

    await addDoc(collection(db, 'bookings'), bookingData);
    await updateDoc(doc(db, 'slots', slot.id), { status: 'booked' });
    Logger.logAction(uid, 'Booking', { teacherId, slotId: slot.id });
    alert('Appointment requested!');
  } catch (err) {
    console.error('Booking error:', err);
    Logger.error('Booking error: ' + err.message);
    alert('Error booking appointment: ' + err.message);
  }
};

async function handleSendMessage(e) {
  e.preventDefault();
  if (!auth.currentUser) {
    document.getElementById('messageStatus').textContent = 'Error: User not authenticated. Please log in again.';
    Logger.error('Send message failed: User not authenticated');
    return;
  }

  const teacherId = document.getElementById('teacherSelect').value;
  const messageText = document.getElementById('messageText').value;
  const studentId = auth.currentUser.uid;

  try {
    await addDoc(collection(db, 'messages'), {
      studentId,
      teacherId,
      message: messageText,
      timestamp: Timestamp.fromDate(new Date())
    });
    Logger.logAction(studentId, 'SendMessage', { teacherId });
    document.getElementById('messageStatus').textContent = '✅ Message sent!';
    e.target.reset();
  } catch (err) {
    Logger.error('Send message error: ' + err.message);
    document.getElementById('messageStatus').textContent = `Error: ${err.message}`;
  }
}