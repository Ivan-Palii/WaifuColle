<script setup>
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import { onMounted, reactive, ref } from "vue";
import CharacterAvatarImageCorp from "@/components/CharacterAvatarImageCorp.vue";

const { createCharacter, getSources } = useFirebaseDataStore();
const characterData = reactive({
	name: "",
	status: "",
	source: null,
	pfp: new URL(`@/assets/default.jpg`, import.meta.url).href,
});
const isValid = ref(false);
const isActive = ref(false);
const sources = ref();
const emptyCheck = (v) => !!v || "Field is required";
const rule = reactive({
	notEmpty: [emptyCheck],
	bool: [(v) => typeof v === "boolean" || "You need to select status"],
});

onMounted(async () => {
	sources.value = await getSources();
});

async function formSubmit() {
	if (isValid.value) {
		await createCharacter(characterData);
		characterData.name = "";
		characterData.status = "";
		characterData.pfp = new URL(`@/assets/default.jpg`, import.meta.url).href;
		characterData.source = null;
	}
}

function customFilter(itemTitle, queryText, item) {
	return (
		item.raw.name.toLowerCase().indexOf(queryText.toLowerCase()) > -1 ||
		!!item.raw.altNames.find((item) => {
			return item.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
		})
	);
}

function corpedImage(data) {
	characterData.pfp = data;
}
</script>
<template>
	<VCard
		:elevation="8"
		class="rounded ma-auto"
		variant="outlined"
		max-width="600"
	>
		<VCardTitle>Create character form</VCardTitle>
		<VRow class="pa-8">
			<VCol cols="12">
				<VForm v-model="isValid" lazy-validation @submit.prevent="formSubmit">
					<VRow class="mb-4">
						<VCol cols="12" md="6" sm="6">
							<div class="d-flex justify-center">
								<VAvatar
									size="200"
									style="border: 1px solid black"
									class="mb-8"
								>
									<VImg :src="characterData.pfp" />
								</VAvatar>
							</div>
							<div class="d-flex justify-center">
								<CharacterAvatarImageCorp
									:aspect-ratio-prop="1 / 1"
									@image="corpedImage"
								/>
							</div>
						</VCol>
						<VCol cols="12" md="6" sm="6">
							<VTextField
								v-model.trim="characterData.name"
								:rules="rule.notEmpty"
								label="Name(*)"
								variant="outlined"
								required
							/>
							<VRadioGroup
								v-model="characterData.status"
								:rules="rule.bool"
								inline
							>
								<template #label> <b>Character status:</b></template>
								<VRadio :value="false" label="Dead" />
								<VRadio :value="true" label="Alive" />
							</VRadioGroup>
							<VAutocomplete
								v-model="characterData.source"
								:items="sources"
								:rules="rule.notEmpty"
								:custom-filter="customFilter"
								item-title="name"
								item-value="id"
								label="Source(*)"
								variant="outlined"
								required
							>
								<template #item="{ props, item }">
									<VListItem v-bind="props" :title="item.raw.name">
										<template #prepend>
											<VImg
												:width="40"
												:aspect-ratio="2 / 3"
												:src="item.raw.poster"
												class="mr-2"
											/>
										</template>
									</VListItem>
								</template>
							</VAutocomplete>
						</VCol>
					</VRow>
					<VBtn width="100%" type="submit" variant="outlined">Create</VBtn>
				</VForm>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
<!--@ready="ready"-->
