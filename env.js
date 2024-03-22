import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAazwWBNrd8Z2XCQKdaLNxqDj3B8jHPiKw",
  authDomain: "voting-a9494.firebaseapp.com",
  projectId: "voting-a9494",
  storageBucket: "voting-a9494.appspot.com",
  messagingSenderId: "337677611546",
  appId: "1:337677611546:web:53db779aecb097d49357a3",
};

const App = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(App);
const FirestoreDB = getFirestore(App);
const FirebaseStorage = getStorage(App);

export { App, FirebaseAuth, FirestoreDB, FirebaseStorage };
