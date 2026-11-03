
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZN-zDFuAh3T0IcPtCqEiue9rion6qrGo",
  authDomain: "vehicleverse-last.firebaseapp.com",
  projectId: "vehicleverse-last",
  storageBucket: "vehicleverse-last.firebasestorage.app",
  messagingSenderId: "372868183802",
  appId: "1:372868183802:web:aead0ddb4d9f783f567b43",
  measurementId: "G-JSDNGDTB0F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
