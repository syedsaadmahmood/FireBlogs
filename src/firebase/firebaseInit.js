import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAJpLl92p1ZSgBxG2pconlKdpck4m-qbBY",
    authDomain: "fireblogs-2f8ed.firebaseapp.com",
    projectId: "fireblogs-2f8ed",
    storageBucket: "fireblogs-2f8ed.appspot.com",
    messagingSenderId: "371785132891",
    appId: "1:371785132891:web:3a3c79729790773b22887e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {timestamp};
  export default firebaseApp.firestore();