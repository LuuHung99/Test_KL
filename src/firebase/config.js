// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyBfu0xiNsYeN3VCgByanlhxBcIhgA1s8l8",
    authDomain: "test-c7366.firebaseapp.com",
    projectId: "test-c7366",
    storageBucket: "test-c7366.appspot.com",
    messagingSenderId: "16317620390",
    appId: "1:16317620390:web:ef2a3b24384289c3741467"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
