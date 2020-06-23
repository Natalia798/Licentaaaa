import * as firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBySMJnen9deiubpLtAJGf7eqdFpiNVpCE",
  authDomain: "booksapp-f8041.firebaseapp.com",
  databaseURL: "https://booksapp-f8041.firebaseio.com",
  projectId: "booksapp-f8041",
  storageBucket: "booksapp-f8041.appspot.com",
  messagingSenderId: "44185187892"
};

firebase.initializeApp(config);
firebase.firestore().settings({});

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();