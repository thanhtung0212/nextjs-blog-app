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
export default async function signUp(
  email: string,
  password: string,
  fullName: string,
) {
  let result = null, // Variable to store the sign-up result
    error = null; // Variable to store any error that occurs

  try {
    result = await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password
    updateProfile(result.user, { displayName: fullName }); // Update the user's display name to their email
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-up
  }
  return { result, error }; // Return the sign-up result and error (if any)
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Create a new Google auth provider
  try {
    return await signInWithPopup(auth, provider); // Sign in with Google
  } catch (e) {
    toast.error(e.message); // Display any error that occurs
    throw e;
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const logout = async () => signOut(auth);
