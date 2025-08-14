// src/config/firebase.ts

import * as admin from 'firebase-admin';

let serviceAccount: admin.ServiceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);
} else {
  // En desarrollo local
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  serviceAccount = require('../serviceAccountKey.json') as admin.ServiceAccount;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
