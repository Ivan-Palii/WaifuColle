<script setup>
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import { onMounted, reactive, ref } from "vue";

const { getSources, getCharacters, createFamily } = useFirebaseDataStore();
const sources = ref();
const characters = ref();

onMounted(async () => {
	sources.value = await getSources();
	characters.value = await getCharacters();
});

const familyData = reactive({
	name: "",
	sources: [],
	isCanon: false,
	members: [],
});
const isValid = ref(false);
const emptyCheck = (v) => !!v || "Field is required";
const rule = reactive({
	notEmpty: [emptyCheck],
});

async function formSubmit() {
	if (isValid.value) {
		console.log(familyData);
		await createFamily(familyData);
		familyData.name = "";
		familyData.sources = [];
		familyData.isCanon = false;
		familyData.members = [];
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
</script>
<template>
	<VCard :elevation="8" class="rounded" variant="outlined">
		<VCardTitle>Create family form</VCardTitle>
		<VRow class="pa-8">
			<VCol cols="12">
				<VForm v-model="isValid" lazy-validation @submit.prevent="formSubmit">
					<VTextField
						v-model.trim="familyData.name"
						:rules="rule.notEmpty"
						label="Name(*)"
						variant="outlined"
						required
					/>
					<VAutocomplete
						v-model="familyData.sources"
						:items="sources"
						:rules="rule.notEmpty"
						:custom-filter="customFilter"
						item-title="name"
						item-value="id"
						label="Source(*)"
						variant="outlined"
						multiple
						chips
						closable-chips
						required
					>
						<template #chip="{ props, item }">
							<VChip
								v-bind="props"
								:prepend-avatar="item.raw.poster"
								:text="item.raw.name"
							/>
						</template>
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
					<VCard variant="outlined">
						<VRow class="pa-4">
							<VCol cols="12">
								<VCardSubtitle>Family members:</VCardSubtitle>
								<VAutocomplete
									v-model="familyData.members"
									:items="characters"
									chips
									closable-chips
									item-title="name"
									item-value="id"
									label="Member(*)"
									variant="outlined"
									multiple
								>
									<template #chip="{ props, item }">
										<VChip
											v-bind="props"
											:prepend-avatar="item.raw.pfp"
											:text="item.raw.name"
										/>
									</template>
									<template #item="{ props, item }">
										<VListItem
											v-bind="props"
											:prepend-avatar="item.raw.pfp"
											:title="item.raw.name"
										/>
									</template>
								</VAutocomplete>
							</VCol>
						</VRow>
					</VCard>
					<VCheckbox v-model="familyData.isCanon" label="Canon" />
					<VBtn width="100%" type="submit" variant="outlined" class="mt-4">
						Create
					</VBtn>
				</VForm>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
<!--:prepend-avatar="item.raw.pfp"-->
