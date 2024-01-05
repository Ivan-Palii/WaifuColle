<script setup>
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const { createSource } = useFirebaseDataStore();
const { sourceCategory } = storeToRefs(useFirebaseDataStore());
const sourceData = reactive({
	name: "",
	author: "",
	categories: [],
	altNames: [],
});
const isValid = ref(false);
const emptyCheck = (v) => !!v || "Field is required";
const rule = reactive({
	notEmpty: [emptyCheck],
});

async function formSubmit() {
	if (isValid.value) {
		await createSource(sourceData);
		sourceData.name = "";
		sourceData.author = "";
		sourceData.categories = [];
		sourceData.altNames = [];
	}
}
</script>
<template>
	<VCard :elevation="8" class="rounded" variant="outlined">
		<VCardTitle>Create source form</VCardTitle>
		<VRow class="pa-8">
			<VCol cols="12">
				<VForm v-model="isValid" lazy-validation @submit.prevent="formSubmit">
					<VTextField
						v-model.trim="sourceData.name"
						:rules="rule.notEmpty"
						label="Name(*)"
						variant="outlined"
						required
					/>
					<div class="mb-8">
						<div
							v-for="(altName, index) in sourceData.altNames"
							:key="index"
							class="d-flex align-center mb-4"
						>
							<VTextField
								v-model="sourceData.altNames[index]"
								:rules="rule.notEmpty"
								label="Alternative name(*)"
								variant="outlined"
								hide-details
							/>
							<VBtn
								class="ml-4 align-self-auto"
								density="comfortable"
								icon="mdi-window-close"
								variant="outlined"
								@click="sourceData.altNames.splice(index, 1)"
							/>
						</div>
						<VBtn variant="outlined" @click="sourceData.altNames.push('')">
							Add alternative name
						</VBtn>
					</div>
					<VTextField
						:v-model="sourceData.author"
						label="Author"
						variant="outlined"
					/>
					<VSelect
						v-model="sourceData.categories"
						:items="sourceCategory"
						:rules="rule.notEmpty"
						item-title="name"
						item-value="id"
						label="Category(*)"
						variant="outlined"
						multiple
						required
					/>
					<VBtn type="submit" variant="outlined">Create</VBtn>
				</VForm>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
