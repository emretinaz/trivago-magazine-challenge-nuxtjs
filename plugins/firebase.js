import firebase from "firebase/app";
import "firebase/firestore";
if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyArg60A7wgofu_q-gUURJeOug7EwCQrj0I",
    authDomain: "trivago-magazine-challenge.firebaseapp.com",
    databaseURL: "https://trivago-magazine-challenge.firebaseio.com",
    projectId: "trivago-magazine-challenge",
    storageBucket: "",
    messagingSenderId: "882962764846",
    appId: "1:882962764846:web:d353ec5ec24a2e60"
  };
  firebase.initializeApp(config);
}
const fireDB = firebase.firestore();
export { fireDB };
