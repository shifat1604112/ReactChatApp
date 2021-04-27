import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIzXgs9sRmwBsLNFf2M8Q9gNR2cdNWE4U",
  authDomain: "reactchatapp-1fd37.firebaseapp.com",
  projectId: "reactchatapp-1fd37",
  storageBucket: "reactchatapp-1fd37.appspot.com",
  messagingSenderId: "480529727656",
  appId: "1:480529727656:web:ffc1d03ed91db0d9e4429d",
  measurementId: "G-S1R147VE2K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;