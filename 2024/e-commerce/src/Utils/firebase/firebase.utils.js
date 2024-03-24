// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
//   signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
export const db = getFirestore( firebaseApp );

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export default firebaseApp;

export const createUserDocWithAuth = async ( userAuth ) => {
    // firestore gives us a doc reference which we use to set or get a doc
    const userDocRef = doc( db, 'users', userAuth.uid );
    console.log( 'userDocRef', userDocRef );

    const userSnapShot = await getDoc( userDocRef );
    // create use doc if it does not exists 
    if( !userSnapShot.exists() ){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc( userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch( err ){
            console.log( 'error creating a error ', err.message  )
        }
    }
    return userDocRef;
}