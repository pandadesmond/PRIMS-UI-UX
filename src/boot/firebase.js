import { boot } from 'quasar/wrappers'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC-X1YBheoQbh9OsAJRmjFyDB3l0F1zBRk",
    authDomain: "honda-eds.firebaseapp.com",
    databaseURL: "https://honda-eds-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "honda-eds",
    storageBucket: "honda-eds.appspot.com",
    messagingSenderId: "223800545051",
    appId: "1:223800545051:web:4486e8d3d3d206df594dbe",
    measurementId: "G-3KZHD8LBCB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth();


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do

  await signInAnonymously(auth)
  .then(() => {
      // Signed in..
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error');
  });//close signInAnonymously

  await onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
  });//close onAuthStateChanged

})
