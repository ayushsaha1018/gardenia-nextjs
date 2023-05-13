import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDbrj4GW2XUVCYUoJOkPhrWgWl9F1Rm3XU",
  authDomain: "gardenia-4fac2.firebaseapp.com",
  projectId: "gardenia-4fac2",
  storageBucket: "gardenia-4fac2.appspot.com",
  messagingSenderId: "250668281442",
  appId: "1:250668281442:web:b7b001a61f9b08e832eb3b"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;