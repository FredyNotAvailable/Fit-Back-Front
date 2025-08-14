// src/config/firebase.ts

import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT no definida en .env');
}

let serviceAccount: admin.ServiceAccount;

try {
  // Reemplaza los \\n por saltos de línea reales
  const json = process.env.FIREBASE_SERVICE_ACCOUNT;
  serviceAccount = JSON.parse(json);
} catch (err) {
  console.error('Error al parsear FIREBASE_SERVICE_ACCOUNT:', err);
  throw new Error('No se pudo parsear FIREBASE_SERVICE_ACCOUNT. Revisa que esté en una sola línea y con \\n en la clave privada.');
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase inicializado correctamente ✅');
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
