import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxx",
  databaseURL:
    "https://xxxxxxxxxxxxxxxxx",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth();

export { database, auth };
export default database;
