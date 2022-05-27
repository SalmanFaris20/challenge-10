import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCAQhApsVw1eMZ1ObT7rMpIQ_8SN3bIUHc',
  authDomain: 'challenge-10-aa810.firebaseapp.com',
  projectId: 'challenge-10-aa810',
  storageBucket: 'challenge-10-aa810.appspot.com',
  messagingSenderId: '746696947659',
  appId: '1:746696947659:web:4664e85906845b2ddba84e',
  measurementId: 'G-TB6W8FYESP',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
