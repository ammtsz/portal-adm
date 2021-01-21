import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import ReduxSagaFirebase from "redux-saga-firebase";

const config = {
  apiKey: "AIzaSyC529pbjZ70e4FePa_DABjJyk3cTla5t0E",
  authDomain: "portal-adm.firebaseapp.com",
  databaseURL: "https://portal-adm.firebaseio.com",
  projectId: "portal-adm",
  storageBucket: "portal-adm.appspot.com",
  messagingSenderId: "691802643129",
  appId: "1:691802643129:web:6ed1589a0bc27984205968",
  measurementId: "G-46P03WPYBY",
};

const firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

//REDUX SAGA FIREBASE
export const rsf = new ReduxSagaFirebase(firebaseApp);

// verifies user's profile and create a new user on firebase if he/she is not registered yet
export const createUserProfileDocumentFirebase = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`usersCredentials/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error trying to create user", error.message);
    }
  }
  return userRef;
};

export const getCurrentUserFirebase = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// GOOGLE AUTHENTICATION (https://firebase.google.com/docs/auth/web/google-signin)
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
