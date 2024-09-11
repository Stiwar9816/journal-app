// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnviroments } from "../helpers/getEnviroments";

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID
} = getEnviroments()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Config production
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID
};

//  Config testing
// const firebaseConfig = {
//   apiKey: VITE_API_KEY_TEST,
//   authDomain: VITE_AUTH_DOMAIN_TEST,
//   projectId: VITE_PROJECT_ID_TEST,
//   storageBucket: VITE_STORAGE_BUCKET_TEST,
//   messagingSenderId: VITE_MESSAGING_SENDER_ID_TEST,
//   appId: VITE_APP_ID_TEST
// };

//  Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp)