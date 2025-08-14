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
  throw new Error('Error al parsear FIREBASE_SERVICE_ACCOUNT: ' + err);
}

// Ahora TypeScript sabe que serviceAccount siempre está definido
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase inicializado correctamente ✅');
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
