import { auth, db } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
    doc, setDoc, getDoc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import Logger from './logger.js';
import { loadAdminDashboard } from './admin.js';
import { loadStudentDashboard } from './student.js';
import { loadTeacherDashboard } from './teacher.js';


const authMessage = document.getElementById('authMessage');
const appSection = document.getElementById('appSection');
const authSection = document.getElementById('authSection');
const userRoleSpan = document.getElementById('userRole');
const logoutBtn = document.getElementById('logoutBtn');

document.getElementById('loginBtn').addEventListener('click', loginUser);
document.getElementById('registerBtn').addEventListener('click', registerUser);

async function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', res.user.uid));
        console.log('User Doc Data:', userDoc.data());
        if (!userDoc.exists()) throw new Error('User profile not found');

        const data = userDoc.data();
        const isApproved = data.approved === true || data.role === 'admin';
        if (!isApproved) {
            await signOut(auth);
            alert('Account is pending approval by admin.');
            return;
        }

        Logger.logAction(res.user.uid, 'Login', { role: data.role });
        showDashboard(data.role);
    } catch (err) {
        authMessage.textContent = `Login failed: ${err.message}`;
        Logger.error(`Login error: ${err.message}`);
    }
}

async function registerUser(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
            role,
            name,
            email,
            approved: role === 'admin'
        };
        console.log('Writing to Firestore:', userData);
        await setDoc(doc(db, 'users', res.user.uid), userData, { merge: true });

        Logger.logAction(res.user.uid, 'Register', { role, name });
        alert('Registered successfully! Please wait for admin approval.');
        await signOut(auth);
    } catch (err) {
        authMessage.textContent = `Registration failed: ${err.message}`;
        Logger.error(`Registration error: ${err.message}`);
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            // Check if account is approved (for non-admins) or if user is admin
            if (data.approved === true || data.role === 'admin') {
                showDashboard(data.role);
            } else {
                await signOut(auth);
                alert('Your account is pending approval.');
                appSection.style.display = 'none';
                authSection.style.display = 'block';
            }
        } else {
            console.error('User document not found');
            await signOut(auth);
            appSection.style.display = 'none';
            authSection.style.display = 'block';
        }
    } else {
        // No user logged in, show auth section
        appSection.style.display = 'none';
        authSection.style.display = 'block';
    }
});


function showDashboard(role) {
    appSection.style.display = 'block';
    authSection.style.display = 'none';

    if (role === 'student') {
        loadStudentDashboard();
    } else if (role === 'teacher') {
        loadTeacherDashboard();
    } else if (role === 'admin') {
        loadAdminDashboard();
    }
}

logoutBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    await signOut(auth);
    Logger.logAction(user?.uid || 'unknown', 'Logout');
    alert('Logged out.');
});
