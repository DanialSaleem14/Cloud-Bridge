// Firebase initialization (from user-provided config)
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsgT4uLys7ThrJl5rGfCgyDHXmuiVM3e8",
  authDomain: "cloud-bridgeofficial.firebaseapp.com",
  projectId: "cloud-bridgeofficial",
  storageBucket: "cloud-bridgeofficial.firebasestorage.app",
  messagingSenderId: "744544279613",
  appId: "1:744544279613:web:cfeda29da6a11cbf021e54",
  measurementId: "G-PN411MSX20",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
analyticsSupported()
  .then((ok) => { if (ok) analytics = getAnalytics(app); })
  .catch(() => { analytics = null; });

export { app, auth, db, analytics, firebaseConfig };
