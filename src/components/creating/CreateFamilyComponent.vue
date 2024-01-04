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
	source: "",
	isCanon: false,
	members: [''],
});
const isValid = ref(false);
const emptyCheck = (v) => !!v || "Field is required";
const rule = reactive({
	notEmpty: [emptyCheck],
});

async function formSubmit() {
	if (isValid.value) {
		await createFamily(familyData)
		// await createSource(familyData);
		/*		familyData.name = "";
		familyData.source = "";
		familyData.isCanon = false;
		familyData.members = [];*/
	}
}
function addFamilyMember() {
	familyData.members.push("");
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
						v-model="familyData.source"
						:items="sources"
						:rules="rule.notEmpty"
						item-title="name"
						item-value="id"
						label="Source(*)"
						variant="outlined"
						required
					/>
					<VCheckbox v-model="familyData.isCanon" label="Canon" />
					<VCard variant="outlined">
						<VRow class="pa-4">
							<VCol cols="12">
								<VCardSubtitle>Family members:</VCardSubtitle>
								<VAutocomplete
									v-for="(member, index) in familyData.members"
									v-model="familyData.members[index]"
									:items="characters"
									:rules="rule.notEmpty"
									:key="member"
									item-title="name"
									item-value="id"
									label="Member(*)"
									variant="outlined"
								/>
								<VBtn variant="outlined" @click="addFamilyMember">
									Add member
								</VBtn>
							</VCol>
						</VRow>
					</VCard>
					<VBtn type="submit" variant="outlined" class="mt-4">Create</VBtn>
				</VForm>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
