// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf8OgqXRRYHdDf9vZi16jwaDiKXb8umUc",
  authDomain: "e-com-reactjs.firebaseapp.com",
  projectId: "e-com-reactjs",
  storageBucket: "e-com-reactjs.appspot.com",
  messagingSenderId: "801242912278",
  appId: "1:801242912278:web:eb090afe5ef83306878737",
  measurementId: "G-0GS2VNWRSG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export default firebaseApp;