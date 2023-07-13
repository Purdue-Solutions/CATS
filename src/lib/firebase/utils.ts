import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink } from 'firebase/auth';

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

/**
 * Send user sign in email
 * @param email user email
 * @returns user if successful
 * @throws error if unsuccessful
 */
export async function sendSignInEmail(email: string) {
  const auth = getFirebaseAuth();
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000/redirect',
    // This must be true.
    handleCodeInApp: true,
  };
  try {
    await sendSignInLinkToEmail(auth, email ,actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  } 
  catch (error: any) {
    throw error;
  }
}

/**
 * Sign in user who signed in with link
 * @returns signed in user if successful
 * @throws error if unsuccessful
 */
export async function signInUser() {
  // Confirm the link is a sign-in with email link.
const auth = getAuth();
if (isSignInWithEmailLink(auth, window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  try {
    const res = await signInWithEmailLink(auth, email!, window.location.href)
    window.localStorage.removeItem('emailForSignIn');
    return res.user
  }
  catch (error) {
    throw error
  }
}

}