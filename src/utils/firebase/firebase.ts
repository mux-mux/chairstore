import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  writeBatch,
} from 'firebase/firestore';
import { DataType } from '../../data';
import { ProductType } from '../../contexts/products';

export type UserAuth = {
  uid: string;
  displayName: string;
  email: string;
};
export type AdditionalInfo = Record<string, string | number | boolean | null>;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'chairstore-db.firebaseapp.com',
  projectId: 'chairstore-db',
  storageBucket: 'chairstore-db.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const addCollectionsAndDocuments = async (
  collectionKey: string,
  docsToAdd: DataType[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  docsToAdd.forEach((document: DataType) => {
    const docRef = doc(collectionRef, document.title.toLowerCase());
    batch.set(docRef, document);
  });

  await batch.commit();
  console.log('done batch commitiing');
};

export const getCollectionsAndDocuments = async () => {
  const collectionRef = collection(db, 'category');
  const queryObj = query(collectionRef);

  const querySnapshot = await getDocs(queryObj);
  const categoryMap = querySnapshot.docs.reduce<Record<string, ProductType[]>>(
    (accum, docSnapshot) => {
      const { title, items } = docSnapshot.data() as DataType;

      accum[title.toLowerCase()] = items;

      return accum;
    },
    {}
  );

  return categoryMap;
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createUserDocument = async (
  userAuth: UserAuth,
  additionalInfo: AdditionalInfo
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email.trim() || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email.trim() || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
