const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyClzkr2p177lugf9HJPbC2nDTVBz06V7-8",
  authDomain: "scubachain-d4e19.firebaseapp.com",
  projectId: "scubachain-d4e19",
  storageBucket: "scubachain-d4e19.firebasestorage.app",
  messagingSenderId: "56129776059",
  appId: "1:56129776059:web:680ca82fcb06383f637c9e",
  measurementId: "G-P3XR3HSBXC"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

module.exports = { firestore };
