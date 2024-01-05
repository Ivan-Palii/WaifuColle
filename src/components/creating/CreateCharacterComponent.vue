<script setup>
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

import { reactive, ref } from "vue";
import CharacterAvatarImageCorp from "@/components/CharacterAvatarImageCorp.vue";

const { createCharacter } = useFirebaseDataStore();
const characterData = reactive({
	name: "",
	status: "",
	pfp: new URL(`@/assets/default.jpg`, import.meta.url).href,
});
const isValid = ref(false);
const isActive = ref(false);
const emptyCheck = (v) => !!v || "Field is required";
const rule = reactive({
	notEmpty: [emptyCheck],
	bool: [(v) => typeof v === "boolean" || "You need to select status"],
});

async function formSubmit() {
	if (isValid.value) {
		await createCharacter(characterData);
		characterData.name = "";
		characterData.status = "";
		characterData.pfp = new URL(`@/assets/default.jpg`, import.meta.url).href;
	}
}

function corpedImage(data) {
	characterData.pfp = data;
}
</script>
<template>
	<VCard :elevation="8" class="rounded" variant="outlined">
		<VCardTitle>Create character form</VCardTitle>
		<VRow class="pa-8">
			<VCol cols="12">
				<VForm v-model="isValid" lazy-validation @submit.prevent="formSubmit">
					<div>
						<VAvatar size="200" style="border: 1px solid black" class="mb-8">
							<VImg :src="characterData.pfp" />
						</VAvatar>
						<CharacterAvatarImageCorp @image="corpedImage" />
					</div>
					<VTextField
						v-model.trim="characterData.name"
						:rules="rule.notEmpty"
						label="Name(*)"
						variant="outlined"
						required
					/>
					<VRadioGroup v-model="characterData.status" :rules="rule.bool" inline>
						<template #label> <b>Character status:</b></template>
						<VRadio :value="false" label="Dead" />
						<VRadio :value="true" label="Alive" />
					</VRadioGroup>
					<VBtn type="submit" variant="outlined">Create</VBtn>
				</VForm>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
<!--@ready="ready"-->
