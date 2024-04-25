import { toast } from 'react-toastify';
import firebaseApp from '../config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// Get the authentication instance using the Firebase app
const auth = getAuth(firebaseApp);

// Function to sign up a user with email and password
export default async function signUp(email: string, password: string) {
  let message = '';
  try {
    return await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password
  } catch (e: any) {
    switch (e.code) {
      case 'auth/email-already-in-use':
        message = 'The email address is already in use by another account.';
        break;
      default:
        message = e?.message;
        break;
    }
    console.log('message', message, e.code === 'auth/email-already-in-use');

    toast.error(message); // Display any error that occurs
    throw e;
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Create a new Google auth provider
  try {
    return await signInWithPopup(auth, provider); // Sign in with Google
  } catch (e: any) {
    toast.error(e?.message); // Display any error that occurs
    throw e;
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    toast.error(error?.message);
    throw error;
  }
};

export const logout = async () => signOut(auth);
