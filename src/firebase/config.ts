// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA0wLVA_3vqMVcinxrnMcJxmQ5b-ypXqSQ',
  authDomain: 'mini-app-4a703.firebaseapp.com',
  projectId: 'mini-app-4a703',
  storageBucket: 'mini-app-4a703.appspot.com',
  messagingSenderId: '907334654043',
  appId: '1:907334654043:web:ae61ed2d6e916b29f1477e',
  measurementId: 'G-CEHZR12ZBP',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
let firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
