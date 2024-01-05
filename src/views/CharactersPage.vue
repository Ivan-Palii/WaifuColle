<script setup>
import CharacterCardComponent from "@/components/character/CharacterCardComponent.vue";
import { useFirebaseDataStore } from "@/store/firebaseData.js";
import { onMounted, ref } from "vue";

const { getCharacters } = useFirebaseDataStore();
const characters = ref();
onMounted(async () => {
	characters.value = await getCharacters();
});
</script>
<template>
	<VRow>
		<VCol v-for="character in characters" :key="character.id" cols="12" md="3">
			<CharacterCardComponent :character="character" />
		</VCol>
	</VRow>
</template>
<style scoped lang="scss"></style>
