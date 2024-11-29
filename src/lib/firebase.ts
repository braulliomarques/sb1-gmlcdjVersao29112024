import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDZHmSqxiWQ1heAXhGWUxZaWHc9KqhtQWc",
  authDomain: "controledeponto-fea96.firebaseapp.com",
  databaseURL: "https://controledeponto-fea96-default-rtdb.firebaseio.com",
  projectId: "controledeponto-fea96",
  storageBucket: "controledeponto-fea96.appspot.com",
  messagingSenderId: "1039781211871",
  appId: "1:1039781211871:web:c4e6a5c8e2b9f40d6f7f7e"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);