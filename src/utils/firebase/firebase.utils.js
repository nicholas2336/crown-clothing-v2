import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-SN1Ev0HX35ZeQiI87HjjBV8YvQAtOXI",
  authDomain: "crown-clothing-e9ce7.firebaseapp.com",
  projectId: "crown-clothing-e9ce7",
  storageBucket: "crown-clothing-e9ce7.appspot.com",
  messagingSenderId: "494834254103",
  appId: "1:494834254103:web:df1d9db480fd16e173f752",
  measurementId: "G-57M1ZZ6YJQ",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('Error creating the user ', error.message);
    }
  } 

  return userDocRef;
}