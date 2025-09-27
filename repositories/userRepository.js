import { db } from '../config/firebase.js';
import { config } from '../config/config.js';

const usersRef = db.collection(config.db.usersCollection);
export const getUserById = async (uid) => {
    const userDoc = await usersRef.doc(uid).get();
    if (!userDoc.exists) throw new Error('User not found');
    return userDoc.data();
};

export const getUserByEmail = async (email) => {
    const snapshot = await usersRef.where('email', '==', email).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
};

export const createUser = async (userData) => {
    const userRef = usersRef.doc();
    await userRef.set({...userData, uid: userRef.id});
    return userRef.id;
};

export const setUserEmailVerified = async (uid) => {
    const userRef = usersRef.doc(uid);
    await userRef.update({ emailVerified: true });
}

export const getAllUsers = async () => {
    const snapshot = await usersRef.get();
    return snapshot.docs.map((doc) => doc.data());
}

export const updateUser = async (uid, userData) => {
    const userRef = usersRef.doc(uid);
    await userRef.update(userData);
}

export const deleteUser = async (uid) => {
    const userRef = usersRef.doc(uid);
    await userRef.delete();
}