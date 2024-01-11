// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAd6kY6vsSi387AxT5Kvn1CFynywNhIvKg",
	authDomain: "angular-firebase-3ac0b.firebaseapp.com",
	projectId: "angular-firebase-3ac0b",
	storageBucket: "angular-firebase-3ac0b.appspot.com",
	messagingSenderId: "156109374285",
	appId: "1:156109374285:web:a567b3c39672a7fabeed04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
