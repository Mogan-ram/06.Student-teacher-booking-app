// scripts/logger.js

import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { db } from './firebase-config.js';

const Logger = {
    info: (msg) => console.log(`[INFO] ${new Date().toLocaleString()} - ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${new Date().toLocaleString()} - ${msg}`),
    error: (msg) => console.error(`[ERROR] ${new Date().toLocaleString()} - ${msg}`),

    async logAction(userId, action, details = {}) {
        const logEntry = { userId, action, details, timestamp: new Date().toISOString() };
        console.log('[ACTION]', logEntry);
        try {
            await addDoc(collection(db, 'logs'), logEntry);
        } catch (err) {
            console.warn('Logger failed to save to Firestore:', err.message);
        }
    },
    error(message) {
        console.error('[ERROR]', message);
    }
};

export default Logger;
