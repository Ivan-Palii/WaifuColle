<script setup>
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import CharacterAvatarImageCorp from "@/components/CharacterAvatarImageCorp.vue";

const { createSource } = useFirebaseDataStore();
const { sourceCategory } = storeToRefs(useFirebaseDataStore());
const sourceData = reactive({
	name: "",
	author: "",
	categories: [],
	altNames: [],
	poster: new URL(`@/assets/default.jpg`, import.meta.url).href,
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
		sourceData.poster = new URL(`@/assets/default.jpg`, import.meta.url).href;
	}
}

function corpedImage(data) {
	sourceData.poster = data;
}
</script>
<template>
	<VCard :elevation="8" class="rounded ma-auto" variant="outlined" max-width="900">
		<VCardTitle>Create source form</VCardTitle>
		<VRow class="pa-8">
			<VCol cols="12">
				<VForm v-model="isValid" lazy-validation @submit.prevent="formSubmit">
					<VRow class="mb-4">
						<VCol cols="12" md="4" sm="6">
							<div class="d-flex justify-center mb-8">
								<VImg
									:max-width="300"
									:aspect-ratio="2 / 3"
									:src="sourceData.poster"
									style="border: 1px solid black"
								/>
							</div>
							<div class="d-flex justify-center">
								<CharacterAvatarImageCorp
									:aspect-ratio-prop="2 / 3"
									@image="corpedImage"
								/>
							</div>
						</VCol>
						<VCol cols="12" md="4" sm="6">
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
								<VBtn variant="outlined" @click="sourceData.altNames.push('')" width="100%">
									Add alternative name
								</VBtn>
							</div>
						</VCol>
						<VCol cols="12" md="4">
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
						</VCol>
					</VRow>
					<VBtn width="100%" type="submit" variant="outlined">Create</VBtn>
				</VForm>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
