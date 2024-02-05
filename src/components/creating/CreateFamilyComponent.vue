<script setup>
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import { onMounted, reactive, ref, watch } from "vue";
import CharacterAvatarImageCorp from "@/components/CharacterAvatarImageCorp.vue";

const { getSources, getCharacters, createFamily } = useFirebaseDataStore();
const sources = ref();
const characters = ref();

onMounted(async () => {
	sources.value = await getSources();
	characters.value = await getCharacters();
});

const familyData = reactive({
	name: "",
	// sources: [],
	isCanon: false,
	members: [],
	pfp: [],
	pfpSrc: []
});
const isPfpChosen = ref(false);
const isValid = ref(false);
const emptyCheck = (v) => !!v || "Field is required";
const rule = reactive({
	notEmpty: [emptyCheck],
});

watch(
	() => familyData.members,
	() => {
		if (familyData.members.length <= 4 && !isPfpChosen.value) {
			familyData.pfp = [];
			familyData.pfpSrc = [];
			familyData.members.forEach((member) => {
				familyData.pfp.push(member.pfp);
				familyData.pfpSrc.push(member.pfpSrc);
			});
		}
	},
	{ deep: true }
);

async function formSubmit() {
	if (isValid.value) {
		await createFamily(familyData, isPfpChosen.value);
		familyData.name = "";
		// familyData.sources = [];
		familyData.isCanon = false;
		familyData.members = [];
		familyData.pfp = [];
		familyData.pfpSrc = [];
		isPfpChosen.value = false;
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
	familyData.pfp = [];
	familyData.pfpSrc = [];
	familyData.pfpSrc.push(data);
	isPfpChosen.value = true;
}
</script>
<template>
	<VCard
		:elevation="8"
		class="rounded ma-auto"
		variant="outlined"
		max-width="600"
	>
		<VCardTitle>Create family form</VCardTitle>
		<VRow class="pa-8">
			<VCol cols="12">
				<VForm v-model="isValid" lazy-validation @submit.prevent="formSubmit">
					<VRow>
						<VCol cols="12" md="6" sm="12" class="ma-0">
							<VAvatar variant="outlined" rounded="0" size="250">
								<VRow class="justify-center">
									<VCol
										v-for="pfp in familyData.pfpSrc"
										:cols="
											isPfpChosen ? 12 : familyData.members.length <= 1 ? 12 : 6
										"
										:key="pfp"
										class="ma-0 pa-0"
									>
										<VImg :src="pfp" />
									</VCol>
								</VRow>
							</VAvatar>

							<div class="d-flex justify-center mt-2">
								<CharacterAvatarImageCorp
									:aspect-ratio-prop="1 / 1"
									@image="corpedImage"
								/>
							</div>
						</VCol>
						<VCol cols="12" md="6" sm="12" class="ma-0">
							<VTextField
								v-model.trim="familyData.name"
								:rules="rule.notEmpty"
								label="Name(*)"
								variant="outlined"
								required
							/>
						</VCol>
					</VRow>
					<!--					<VAutocomplete-->
					<!--						v-model="familyData.sources"-->
					<!--						:items="sources"-->
					<!--						:rules="rule.notEmpty"-->
					<!--						:custom-filter="customFilter"-->
					<!--						item-title="name"-->
					<!--						item-value="id"-->
					<!--						label="Source(*)"-->
					<!--						variant="outlined"-->
					<!--						multiple-->
					<!--						chips-->
					<!--						closable-chips-->
					<!--						required-->
					<!--					>-->
					<!--						<template #chip="{ props, item }">-->
					<!--							<VChip-->
					<!--								v-bind="props"-->
					<!--								:prepend-avatar="item.raw.poster"-->
					<!--								:text="item.raw.name"-->
					<!--							/>-->
					<!--						</template>-->
					<!--						<template #item="{ props, item }">-->
					<!--							<VListItem v-bind="props" :title="item.raw.name">-->
					<!--								<template #prepend>-->
					<!--									<VImg-->
					<!--										:width="40"-->
					<!--										:aspect-ratio="2 / 3"-->
					<!--										:src="item.raw.poster"-->
					<!--										class="mr-2"-->
					<!--									/>-->
					<!--								</template>-->
					<!--							</VListItem>-->
					<!--						</template>-->
					<!--					</VAutocomplete>-->
					<VCard variant="outlined" class="mt-4">
						<VRow class="pa-4">
							<VCol cols="12">
								<VCardSubtitle>Family members:</VCardSubtitle>
								<!--								item-value="id"-->
								<VAutocomplete
									v-model="familyData.members"
									:items="characters"
									chips
									closable-chips
									item-title="name"
									return-object
									label="Member(*)"
									variant="outlined"
									multiple
								>
									<template #chip="{ props, item }">
										<VChip
											v-bind="props"
											:prepend-avatar="item.raw.pfpSrc"
											:text="item.raw.name"
										/>
									</template>
									<template #item="{ props, item }">
										<VListItem
											v-bind="props"
											:prepend-avatar="item.raw.pfpSrc"
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
