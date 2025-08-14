// src/config/firebase.ts

import * as admin from 'firebase-admin';

let serviceAccount: admin.ServiceAccount;

if (process.env.FIREBASE_KEY) {
  // En producción: lo tomamos de la variable de entorno en Render
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY as string);
} else {
  // En desarrollo local: cargamos el JSON físico
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  serviceAccount = require('./serviceAccountKey.json');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
