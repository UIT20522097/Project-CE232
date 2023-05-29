import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTLl9EULQgI1odZrfBR1L1t0MXr5a3rUk",
  authDomain: "intrepid-abacus-381515.firebaseapp.com",
  databaseURL: "https://intrepid-abacus-381515-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "intrepid-abacus-381515",
  storageBucket: "intrepid-abacus-381515.appspot.com",
  messagingSenderId: "210083530738",
  appId: "1:210083530738:web:1ffe6ac2b7e18f61cdcd6b",
  measurementId: "G-3D01V6GZ67"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
