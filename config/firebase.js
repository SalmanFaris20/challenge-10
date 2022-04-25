import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPT8NyY_p9Pf02LvjuZMfclHIPd9-fYO0",
  authDomain: "challengec9-59c6d.firebaseapp.com",
  projectId: "challengec9-59c6d",
  storageBucket: "challengec9-59c6d.appspot.com",
  messagingSenderId: "155859223575",
  appId: "1:155859223575:web:a98afcdf3b10d1fe47c852",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
