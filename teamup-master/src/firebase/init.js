// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB4lYcs595JXBYv0S2E5CBdLmsVlu1suVQ",
    authDomain: "teamup-e2457.firebaseapp.com",
    databaseURL: "https://teamup-e2457.firebaseio.com",
    projectId: "teamup-e2457",
    storageBucket: "teamup-e2457.appspot.com",
    messagingSenderId: "353221211037",
    appId: "1:353221211037:web:56830a5054754ff9597574"
  };

// Initialize Firebase
//const firebaseApp =
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default firebase.firestore();
