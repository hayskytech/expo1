import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDpur8-k34SDj15Gx5zbeclAndYjfQk6FM",
  authDomain: "apps-773b4.firebaseapp.com",
  databaseURL: "https://apps-773b4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "apps-773b4",
  storageBucket: "apps-773b4.firebasestorage.app",
  messagingSenderId: "1005628271813",
  appId: "1:1005628271813:web:29538a33840fac264514ac"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Database
const db = getDatabase(app);

// Initialize Auth with AsyncStorage persistence for React Native
let auth;
// try {
//   auth = getAuth(app);
// } catch (error) {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//   });
// }

export { db, app, auth }