import firebaseAdmin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_ADMIN_CONFIG, FIREBASE_DATABASE_URL } from '../constants/firebase.constants.js';

export const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(FIREBASE_ADMIN_CONFIG),
    databaseURL: FIREBASE_DATABASE_URL,
});

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(email, password);
}

export const verifyToken = (token) => {
    return admin.auth().verifyIdToken(token);
}


