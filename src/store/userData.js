import { ref } from "vue";
import { defineStore } from "pinia";
import { auth, db } from "../firebase/firebase.config.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

export const useUserDataStore = defineStore("userData", () => {
	const user = ref(null);
	const userDetails = ref(null);

	onAuthStateChanged(auth, async (currentUser) => {
		user.value = currentUser;
		const userCollection = await getDoc(doc(db, "userDetails", user.value.uid));
		userDetails.value = userCollection.data();
	});

	async function registerUser(userData) {
		await createUserWithEmailAndPassword(
			auth,
			userData.email,
			userData.password
		)
			.then(async () => await modifyUserDetails(userData))
			.catch((err) => console.log(err));
	}

	async function modifyUserDetails(userData) {
		const docRef = await setDoc(doc(db, "userDetails", user.value.uid), {
			displayName: userData.displayName,
			initials: userData.displayName.slice(0, 2).toUpperCase()
		});

		console.log(docRef);
	}

	async function logIn(userData) {
		await signInWithEmailAndPassword(auth, userData.email, userData.password);
	}
	async function logOut() {
		await signOut(auth);
		user.value = null;
		userDetails.value = null;
	}

	return {
		user,
		userDetails,
		registerUser,
		logOut,
		logIn,
	};
});
