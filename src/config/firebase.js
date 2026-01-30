import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";

export let app, firestore, storage, adminStorage;

export const initializeFirebaseApp = () => {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  app = initializeApp(firebaseConfig);

  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
    ),
    storageBucket: firebaseConfig.storageBucket,
  });

  adminStorage = admin.storage();
  firestore = getFirestore(app);
  storage = getStorage(app);
};
