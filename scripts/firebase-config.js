// scripts/firebase-config.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCHYvtRtMn0fJPkPAXs8csufnxbmXZUU2c",
    authDomain: "studentteacherappointmen-9cad2.firebaseapp.com",
    projectId: "studentteacherappointmen-9cad2",
    storageBucket: "studentteacherappointmen-9cad2.firebasestorage.app",
    messagingSenderId: "418499813102",
    appId: "1:418499813102:web:8403882306391c54fa9dff"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
