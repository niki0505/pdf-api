import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json" with { type: "json" };

export let app, firestore, storage, adminStorage;

export const initializeFirebaseApp = () => {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  storage = getStorage(app);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseConfig.storageBucket,
  });

  adminStorage = admin.storage();
};
