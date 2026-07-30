// Firebase initialization (from user-provided config)
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics may fail in non-browser environments; ignore silently.
  analytics = null;
}

export { app, analytics, firebaseConfig };
