import { ref } from "vue";
import { defineStore } from "pinia";
import { db } from "../firebase/firebase.config.js";
import {
	collection,
	doc,
	getDocs,
	addDoc,
	query,
	where,
} from "firebase/firestore";

export const useFirebaseDataStore = defineStore("firebaseData", () => {
	const sourceCategory = ref([]);

	async function getCategories() {
		sourceCategory.value = [];
		const sourcesCollection = await getDocs(collection(db, "sourceCategory"));
		sourcesCollection.forEach((item) =>
			sourceCategory.value.push({ ...item.data(), id: item.id })
		);
	}
	async function getCharacters() {
		const charactersData = ref([]);
		const charactersCollection = await getDocs(collection(db, "character"));
		charactersCollection.forEach((item) =>
			charactersData.value.push({ ...item.data(), id: item.id })
		);

		return charactersData.value;
	}

	async function getSources() {
		const sourceData = ref([]);
		const sourceCollection = await getDocs(collection(db, "source"));
		sourceCollection.forEach(async (item) =>
			sourceData.value.push({ ...item.data(), id: item.id })
		);

		return sourceData.value;
	}
	async function getFamilies(props = {}) {
		const familiesData = ref([]);
		const familiesCollection = await getDocs(await queryBuilder(props));
		familiesCollection.forEach(async (item) =>
			familiesData.value.push({ ...item.data(), id: item.id })
		);

		return familiesData.value;
	}
	async function queryBuilder(props) {
		if (Object.keys(props).length) {
			try {
				const categoriesDocRef = ref([]);
				const sourcesDocRef = ref([]);
				props.categories.forEach((el) =>
					categoriesDocRef.value.push(doc(db, "sourceCategory", el))
				);

				const qCategories = query(
					collection(db, "source"),
					where("category", "in", categoriesDocRef.value)
				);

				const sources = await getDocs(qCategories);
				sources.forEach((el) =>
					sourcesDocRef.value.push(doc(db, "source", el.id))
				);
				return query(
					collection(db, "family"),
					where("source", "in", sourcesDocRef.value)
				);
			} catch (e) {
				console.error("Wrong db request", e);
				return query(collection(db, "family"));
			}
		} else return query(collection(db, "family"));
	}

	async function createSource(sourceData) {
		const docRef = await addDoc(collection(db, "source"), {
			...sourceData,
			category: doc(db, "sourceCategory", sourceData.category),
		});
		console.info("Document written with ID: ", docRef.id);
	}

	async function createCharacter(characterData) {
		const docRef = await addDoc(collection(db, "character"), {
			...characterData,
		});
		console.info("Document written with ID: ", docRef.id);
	}

	async function createFamily(familyData) {
		const charactersDocRef = ref([]);
		familyData.members.forEach((item) => {
			charactersDocRef.value.push(doc(db, "character", item));
		});

		const docRef = await addDoc(collection(db, "family"), {
			...familyData,
			members: charactersDocRef.value,
			source: doc(db, "source", familyData.source),
		});
		console.info("Document written with ID: ", docRef.id);
	}

	return {
		sourceCategory,
		getCategories,
		getSources,
		getCharacters,
		getFamilies,
		createSource,
		createCharacter,
		createFamily,
	};
});
