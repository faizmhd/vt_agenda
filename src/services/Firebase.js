import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDTf9mMDnOVt1PTNt7U0yN3MI6rsEzUgL0",
    authDomain: "vt-agenda.firebaseapp.com",
    databaseURL: "https://vt-agenda.firebaseio.com",
    projectId: "vt-agenda",
    storageBucket: "vt-agenda.appspot.com",
    messagingSenderId: "638614641322",
    appId: "1:638614641322:web:4f1455f3eb7e211fe50ed3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;