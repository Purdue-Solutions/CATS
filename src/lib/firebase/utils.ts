import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

/**
 * Check if app exists, if so return it. Else, initialize app.
 * @returns Firebase App Object
 */
export function getFirebaseApp() {
  const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp()
  return app
}

/**
 * Return firebase auth object
 * @returns firebase auth object
 */
export function getFirebaseAuth() {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  return auth
}