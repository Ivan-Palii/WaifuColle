<script setup>
import { useFirebaseDataStore } from "../store/firebaseData.js";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import FamilyList from "@/components/lists/FamilyList.vue";

const { sourceCategory } = storeToRefs(useFirebaseDataStore());
const { getFamilies } = useFirebaseDataStore();
const selectedCategories = ref([]);
const families = ref()
onMounted(async () => {
	families.value = await getFamilies();
});

async function updateFilter() {
	if (selectedCategories.value.length)
		families.value = await getFamilies({ categories: selectedCategories.value });
	else families.value = await getFamilies();
}
</script>
<template>
	<h2>Home page</h2>
	<VRow class="d-flex flex-column align-center">
		<h2 class="text-h6 mb-2">Choose categories</h2>
		<VChipGroup v-model="selectedCategories" column multiple class="mb-4">
			<VChip
				v-for="category in sourceCategory"
				:value="category.id"
				:key="category.id"
				variant="outlined"
			>
				{{ category.name }}
			</VChip>
		</VChipGroup>
		<VBtn variant="outlined" @click="updateFilter">Update filter</VBtn>
	</VRow>
	<FamilyList :families="families" />
<!--	{{ selectedCategories }}-->
</template>
<style scoped lang="scss"></style>
