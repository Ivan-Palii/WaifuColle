import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { auth, db } from "../firebase/firebase.config.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { useSnackbarStore } from "@/store/snackbarStore.js";

export const useUserDataStore = defineStore("userData", () => {
	const user = ref(null);
	const userDetails = ref({});
	const { setSnackbarParams } = useSnackbarStore();
	const userInLocalStorage = localStorage.getItem("user");
	const userDetailsInLocalStorage = localStorage.getItem("userDetails");

	if (userInLocalStorage) {
		user.value = JSON.parse(userInLocalStorage)._value;
	}
	if (userDetailsInLocalStorage) {
		userDetails.value = {
			role: {
				id: userDetailsInLocalStorage.slice(
					1,
					userDetailsInLocalStorage.length - 1
				),
			},
		};
	}

	watch(
		() => user,
		(state) => {
			localStorage.setItem("user", JSON.stringify(state));
		},
		{ deep: true }
	);

	watch(
		() => userDetails.value?.role,
		(state) => {
			if (state === undefined) localStorage.removeItem("userDetails");
			else localStorage.setItem("userDetails", JSON.stringify(state.id));
		},
		{ deep: true }
	);

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
		setSnackbarParams({
			isOpen: true,
			message: "Registration completed successfully",
			color: "green",
		});
	}

	async function modifyUserDetails(userData) {
		const roleRef = ref();
		if (userData.role) {
			roleRef.value = await doc(db, "userRoles", userData.role);
		} else {
			roleRef.value = await doc(db, "userRole", "USER");
		}
		const docRef = await setDoc(doc(db, "userDetails", user.value.uid), {
			displayName: userData.displayName,
			initials: userData.displayName.slice(0, 2).toUpperCase(),
			role: roleRef.value,
		});

		console.log(docRef);
	}

	async function logIn(userData) {
		await signInWithEmailAndPassword(auth, userData.email, userData.password);
		setSnackbarParams({
			isOpen: true,
			message: "Login completed successfully",
			color: "green",
		});
	}
	async function logOut() {
		await signOut(auth);
		user.value = null;
		userDetails.value = null;
		setSnackbarParams({
			isOpen: true,
			message: "Logout completed successfully",
			color: "green",
		});
	}

	return {
		user,
		userDetails,
		registerUser,
		logOut,
		logIn,
	};
});
