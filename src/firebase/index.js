// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
const config = {
    apiKey: "AIzaSyA6OMEFBExiOM-_81Xx_1E1GoZ9H2nTVNQ",
    authDomain: "vaccine-passport-746f9.firebaseapp.com",
    projectId: "vaccine-passport-746f9",
    storageBucket: "vaccine-passport-746f9.appspot.com",
    messagingSenderId: "347945793017",
    appId: "1:347945793017:web:761b2b2d2efa763b163928",
    measurementId: "G-MTKQXPLBS4"
};

firebase.initializeApp(config);
const db = firebase.firestore();
export { db };
