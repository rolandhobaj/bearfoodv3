import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyDY8QMgac_DPnIA3T6lYWPqXq6LesUyWnU',
  authDomain: 'bearfood-a9597.firebaseapp.com',
  databaseURL: 'https://bearfood-a9597-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bearfood-a9597',
  storageBucket: 'bearfood-a9597.appspot.com',
  messagingSenderId: '454930290059',
  appId: '1:454930290059:web:287566ce452fa6f7c50b8e',
};

const app = initializeApp(firebaseConfig);

export default app;