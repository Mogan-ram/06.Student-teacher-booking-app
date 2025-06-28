import { db, auth } from './firebase-config.js';
import {
  collection, getDocs, doc, updateDoc, query, where, addDoc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { Timestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import Logger from './logger.js';

const dashboard = document.getElementById('dashboard');

export async function loadTeacherDashboard() {
  dashboard.innerHTML = `
    <h3>👨‍🏫 Teacher Dashboard</h3>
    <button id="loadBookings">View Appointments</button>
    <div id="bookingList"></div>
    <button id="loadMessages">View Messages</button>
    <div id="messageList"></div>
    <h4>Add Available Slot</h4>
    <form id="addSlotForm">
      <input type="date" id="slotDate" required />
      <input type="time" id="slotTime" required />
      <button type="submit">Add Slot</button>
    </form>
    <div id="slotStatus"></div>
  `;
  console.log('Teacher dashboard loaded:', dashboard.innerHTML);

  document.getElementById('loadBookings').addEventListener('click', loadBookings);
  document.getElementById('loadMessages').addEventListener('click', loadMessages);
  document.getElementById('addSlotForm').addEventListener('submit', handleAddSlot);
}

async function loadBookings() {
  const list = document.getElementById('bookingList');
  list.innerHTML = '<em>Loading bookings...</em>';

  try {
    const q = query(collection(db, 'bookings'), where('teacherId', '==', auth.currentUser.uid));
    const snap = await getDocs(q);
    const bookings = [];

    snap.forEach(docSnap => {
      bookings.push({ id: docSnap.id, ...docSnap.data() });
    });

    const studentIds = [...new Set(bookings.map(b => b.studentId))];
    let studentsMap = {};
    if (studentIds.length > 0) {
      const studentQuery = query(collection(db, 'users'), where('__name__', 'in', studentIds));
      const studentSnap = await getDocs(studentQuery);
      studentSnap.forEach(doc => {
        studentsMap[doc.id] = doc.data().name || 'Unknown Student';
      });
    }

    const bookingsWithNames = bookings.map(b => ({
      ...b,
      studentName: studentsMap[b.studentId] || 'Unknown Student'
    }));

    list.innerHTML = bookingsWithNames.length
      ? bookingsWithNames.map(b => `
          <div>
            Student: ${b.studentName} | Date: ${b.date} | Time: ${b.time} | Status: ${b.status}
            ${b.status === 'pending' ? `
              <button onclick="approveBooking('${b.id}')">Approve ✅</button>
              <button onclick="cancelBooking('${b.id}')">Cancel ❌</button>
            ` : ''}
          </div>`).join('')
      : '<p>No bookings found</p>';
  } catch (err) {
    Logger.error('Error loading bookings: ' + err.message);
    list.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

async function loadMessages() {
  const list = document.getElementById('messageList');
  list.innerHTML = '<em>Loading messages...</em>';

  try {
    const q = query(collection(db, 'messages'), where('teacherId', '==', auth.currentUser.uid));
    const snap = await getDocs(q);
    const messages = [];

    snap.forEach(docSnap => {
      messages.push({ id: docSnap.id, ...docSnap.data() });
    });

    const studentIds = [...new Set(messages.map(m => m.studentId))];
    let studentsMap = {};
    if (studentIds.length > 0) {
      const studentQuery = query(collection(db, 'users'), where('__name__', 'in', studentIds));
      const studentSnap = await getDocs(studentQuery);
      studentSnap.forEach(doc => {
        studentsMap[doc.id] = doc.data().name || 'Unknown Student';
      });
    }

    list.innerHTML = messages.length
      ? messages.map(m => `
          <div>
            From: ${studentsMap[m.studentId] || 'Unknown Student'}<br>
            Message: ${m.message}<br>
            Sent: ${new Date(m.timestamp).toLocaleString()}
          </div>`).join('')
      : '<p>No messages found</p>';
  } catch (err) {
    Logger.error('Error loading messages: ' + err.message);
    list.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

window.approveBooking = async function approveBooking(bookingId) {
  try {
    await updateDoc(doc(db, 'bookings', bookingId), { status: 'approved' });
    Logger.logAction(auth.currentUser.uid, 'ApproveBooking', { bookingId });
    alert('Booking approved');
    loadBookings();
  } catch (err) {
    Logger.error('Error approving booking: ' + err.message);
    alert('Error approving booking: ' + err.message);
  }
};

window.cancelBooking = async function cancelBooking(bookingId) {
  if (confirm('Are you sure you want to cancel this booking?')) {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: 'cancelled' });
      Logger.logAction(auth.currentUser.uid, 'CancelBooking', { bookingId });
      alert('Booking cancelled');
      loadBookings();
    } catch (err) {
      Logger.error('Error cancelling booking: ' + err.message);
      alert('Error cancelling booking: ' + err.message);
    }
  }
};

async function handleAddSlot(e) {
  e.preventDefault();
  if (!auth.currentUser) {
    alert('Error: User not authenticated. Please log in again.');
    Logger.error('Slot creation failed: User not authenticated');
    return;
  }

  const date = document.getElementById('slotDate').value;
  const time = document.getElementById('slotTime').value;
  const teacherId = auth.currentUser.uid;

  if (!date || !time) {
    alert('Please fill in both date and time.');
    Logger.error('Slot creation failed: Missing date or time');
    return;
  }

  // Validate date is not in the past
  const selectedDate = new Date(`${date}T${time}`);
  if (selectedDate < new Date()) {
    alert('Cannot create slots in the past.');
    Logger.error('Slot creation failed: Date in the past');
    return;
  }

  const slotData = {
    teacherId,
    date,
    time,
    status: 'available',
    timestamp: Timestamp.fromDate(new Date())
  };
  console.log('Creating slot:', slotData);

  try {
    await addDoc(collection(db, 'slots'), slotData);
    Logger.logAction(teacherId, 'AddSlot', { date, time });
    document.getElementById('slotStatus').textContent = '✅ Slot added!';
    e.target.reset();
  } catch (err) {
    Logger.error('Error adding slot: ' + err.message);
    document.getElementById('slotStatus').textContent = `Error: ${err.message}`;
    console.error('Slot creation error:', err);
  }
}