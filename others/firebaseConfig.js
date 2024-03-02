import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2LaHxtXtwJNsaQ3Lk99qe5V-WK2ojEV0",
  authDomain: "urdu-duniya-news.firebaseapp.com",
  databaseURL: "https://urdu-duniya-news-default-rtdb.firebaseio.com",
  projectId: "urdu-duniya-news",
  storageBucket: "urdu-duniya-news.appspot.com",
  messagingSenderId: "446034365752",
  appId: "1:446034365752:web:fbb85ab0a524d2be1305cd"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, app }