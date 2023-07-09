import firebaseAdmin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import  JWT  from 'jsonwebtoken';
import { FIREBASE_ADMIN_CONFIG, FIREBASE_APP_CONFIG, FIREBASE_DATABASE_URL } from '../constants/firebase.constants.js';


export const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(FIREBASE_ADMIN_CONFIG),
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: "gs://netflix-modify.appspot.com/"
});

export const app = initializeApp(FIREBASE_APP_CONFIG);

export const auth = getAuth(app);

export const upload = (blob) => uploadBytes(ref(getStorage(app), 'avatars'), blob);

export const signIn = async (email, password) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const accessToken = await data.user.getIdToken();
    const uid = data.user.uid;

    return {
        userId: uid,
        accessToken,
    };
}

export const generateAccessToken = async (uid, custom) => {
    const customAccessToken = await generateToken(uid, custom);
    return customAccessToken;
}

export const generateToken = (uid, data) => {
    return admin.auth().createCustomToken(uid, data);
}

export const verifyToken = (token) => {
    return JWT.decode(token);
}

export const createUser = (email, password) => {
    return admin.auth().createUser({ email, password });
}

export const database = admin.database();