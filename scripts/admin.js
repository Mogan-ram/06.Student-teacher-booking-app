import { db, auth } from './firebase-config.js';
import {
    collection, getDocs, doc, updateDoc, setDoc, deleteDoc, query, where
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const dashboard = document.getElementById('dashboard');

export async function loadAdminDashboard() {
    dashboard.innerHTML = `
    <h3>👮 Admin Dashboard</h3>
    <button id="loadPending">Load Pending Users</button>
    <div id="pendingList"></div>
    <hr/>
    <h4>Add New Teacher</h4>
    <form id="addTeacherForm">
      <input type="text" id="tname" placeholder="Teacher Name" required />
      <input type="email" id="temail" placeholder="Email" required />
      <input type="password" id="tpassword" placeholder="Password" required />
      <input type="text" id="dept" placeholder="Department" required />
      <input type="text" id="subject" placeholder="Subject" required />
      <button type="submit">Add Teacher</button>
    </form>
    <div id="teacherStatus"></div>
    <hr/>
    <h4>Manage Teachers</h4>
    <button id="loadTeachers">Load Teachers</button>
    <div id="teacherList"></div>
  `;

    document.getElementById('loadPending').addEventListener('click', loadPendingUsers);
    document.getElementById('addTeacherForm').addEventListener('submit', handleAddTeacher);
    document.getElementById('loadTeachers').addEventListener('click', loadTeachersForAdmin);
}

async function loadPendingUsers() {
    const list = document.getElementById('pendingList');
    list.innerHTML = '<em>Loading pending users...</em>';

    const q = query(collection(db, 'users'), where('approved', '==', false));
    const snap = await getDocs(q);
    const users = [];

    snap.forEach(docSnap => {
        const data = docSnap.data();
        if (data.role !== 'admin') {
            users.push({ id: docSnap.id, ...data });
        }
    });

    list.innerHTML = users.length
        ? users.map(u => `
        <div>
          ${u.name} | ${u.email} | ${u.role}
          <button onclick="approveUser('${u.id}')">Approve ✅</button>
        </div>`).join('')
        : '<p>No pending users</p>';
}

async function handleAddTeacher(e) {
    e.preventDefault();
    const name = document.getElementById('tname').value;
    const email = document.getElementById('temail').value;
    const password = document.getElementById('tpassword').value;
    const dept = document.getElementById('dept').value;
    const subject = document.getElementById('subject').value;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const uid = res.user.uid;

        await setDoc(doc(db, 'users', uid), {
            name,
            email,
            role: 'teacher',
            approved: true,
            dept,
            subject
        });

        document.getElementById('teacherStatus').textContent = '✅ Teacher added & approved!';
        e.target.reset();
    } catch (err) {
        document.getElementById('teacherStatus').textContent = `Error: ${err.message}`;
    }
}

window.approveUser = async function approveUser(uid) {
    try {
        await updateDoc(doc(db, 'users', uid), { approved: true });
        alert('User approved!');
        loadPendingUsers();
    } catch (err) {
        alert('Error approving user: ' + err.message);
    }
};

async function loadTeachersForAdmin() {
    const list = document.getElementById('teacherList');
    list.innerHTML = '<em>Loading teachers...</em>';

    const q = query(collection(db, 'users'), where('role', '==', 'teacher'));
    const snap = await getDocs(q);
    const teachers = [];

    snap.forEach(docSnap => {
        teachers.push({ id: docSnap.id, ...docSnap.data() });
    });

    list.innerHTML = teachers.length
        ? teachers.map(t => `
        <div>
          <strong>${t.name}</strong> | ${t.dept} | ${t.subject}
          <button onclick="updateTeacher('${t.id}')">Update</button>
          <button onclick="deleteTeacher('${t.id}')">Delete</button>
        </div>`).join('')
        : '<p>No teachers found</p>';
}

window.updateTeacher = async function updateTeacher(teacherId) {
    const name = prompt('Enter new name:');
    const dept = prompt('Enter new department:');
    const subject = prompt('Enter new subject:');
    if (name && dept && subject) {
        try {
            await updateDoc(doc(db, 'users', teacherId), { name, dept, subject });
            alert('Teacher updated!');
            loadTeachersForAdmin();
        } catch (err) {
            alert('Error updating teacher: ' + err.message);
        }
    }
};

window.deleteTeacher = async function deleteTeacher(teacherId) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        try {
            await deleteDoc(doc(db, 'users', teacherId));
            alert('Teacher deleted!');
            loadTeachersForAdmin();
        } catch (err) {
            alert('Error deleting teacher: ' + err.message);
        }
    }
};