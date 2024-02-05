import { ref } from "vue";
import { defineStore } from "pinia";
import { db } from "../firebase/firebase.config.js";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
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
		const tmpData = ref([]);
		const charactersCollection = await getDocs(collection(db, "character"));
		charactersCollection.forEach((item) =>
			tmpData.value.push({ ...item.data(), id: item.id })
		);

		await tmpData.value.forEach(async (item) => {
			const pfp = (await getDoc(item.pfp)).data().image;
			charactersData.value.push({ ...item, pfpSrc: pfp });
		});

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
		const tmpData = ref([]);
		const familiesCollection = await getDocs(await queryBuilder(props));
		familiesCollection.forEach(async (item) =>
			tmpData.value.push({ ...item.data(), id: item.id })
		);

		/*
		*
		* await tmpData.value.forEach(async (item) => {
			const pfp = (await getDoc(item.pfp)).data().image;
			charactersData.value.push({ ...item, pfpSrc: pfp });
		  });
		* */

		await tmpData.value.forEach(async (item) => {
			const pfp = await item.pfp.map(
				async (pfpSrc) => (await getDoc(pfpSrc)).data().image
			);
			const pfpValue = await Promise.all(pfp);
			console.log("inside foreach");
			familiesData.value.push({ ...item, pfpSrc: pfpValue });
		});

		await console.log("after foreach");
		await console.log(familiesData.value);
		// await tmpData.value.forEach(async (item) => {
		// 	const pfp = ref([]);
		// 	await item.pfp.forEach(
		// 		async (src) => pfp.value.push(await getDoc(src)).data().image
		// 	);
		// 	familiesData.value.push({ ...item, pfpSrc: pfp });
		// });

		return familiesData.value;
	}
	async function queryBuilder(props) {
		if (Object.keys(props).length) {
			try {
				// console.log(props);
				const categoriesDocRef = ref([]);
				const sourcesDocRef = ref([]);
				props.categories.forEach((el) =>
					categoriesDocRef.value.push(doc(db, "sourceCategory", el))
				);

				console.log(categoriesDocRef.value);

				const qCategories = query(
					collection(db, "source"),
					where("categories", "array-contains-any", categoriesDocRef.value)
				);

				const sources = await getDocs(qCategories);
				sources.forEach((el) =>
					sourcesDocRef.value.push(doc(db, "source", el.id))
				);
				return query(
					collection(db, "family"),
					where("sources", "array-contains-any", sourcesDocRef.value)
				);
			} catch (e) {
				console.error("Wrong db request", e);
				return query(collection(db, "family"));
			}
		} else return query(collection(db, "family"));
	}
	async function createSource(sourceData) {
		const categoriesDocRef = ref([]);
		sourceData.categories.forEach((item) => {
			categoriesDocRef.value.push(doc(db, "sourceCategory", item));
		});

		const docRef = await addDoc(collection(db, "source"), {
			...sourceData,
			categories: categoriesDocRef.value,
		});
		console.info("Document written with ID: ", docRef.id);
	}
	async function createCharacter(characterData) {
		const pfpDocRef = ref();
		pfpDocRef.value = await createServiceImages([characterData.pfp]);
		const sourceDocRef = ref();
		sourceDocRef.value = doc(db, "source", characterData.source);
		const docRef = await addDoc(collection(db, "character"), {
			...characterData,
			source: sourceDocRef.value,
			pfp: pfpDocRef.value,
		});
		console.info("Document written with ID: ", docRef.id);
	}

	async function createFamily(familyData, isPfpChosen) {
		const sourcesIdSet = new Set();
		const sourcesDocRef = ref([]);
		const charactersDocRef = ref([]);

		if (isPfpChosen) {
			const pfpDocRef = ref();
			pfpDocRef.value = await createServiceImages([familyData.pfpSrc[0]]);
			familyData.pfp = [pfpDocRef.value];
		}

		delete familyData.pfpSrc;
		console.log(familyData);

		familyData.members.forEach((item) => {
			sourcesIdSet.add(item.source.id);
			charactersDocRef.value.push(doc(db, "character", item.id));
		});

		sourcesIdSet.forEach((item) => {
			sourcesDocRef.value.push(doc(db, "source", item));
		});

		/*		familyData.members.forEach((item) => {
			charactersDocRef.value.push(doc(db, "character", item));
		});
		charactersDocRef.value.forEach((item) => {
			console.log(item.data());
		});
		familyData.sources.forEach((item) => {
			sourcesDocRef.value.push(doc(db, "source", item));
		});
		console.log(sourcesDocRef.value);
		console.log(charactersDocRef.value);*/

		const docRef = await addDoc(collection(db, "family"), {
			...familyData,
			members: charactersDocRef.value,
			sources: sourcesDocRef.value,
		});
		console.info("Document written with ID: ", docRef.id);
	}

	async function createServiceImages(data) {
		const serviceImgsDocRef = ref([]);
		await data.forEach((image) => {
			serviceImgsDocRef.value.push(
				addDoc(collection(db, "serviceImg"), { image })
			);
		});
		return serviceImgsDocRef.value.length === 1
			? serviceImgsDocRef.value[0]
			: serviceImgsDocRef.value;
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
