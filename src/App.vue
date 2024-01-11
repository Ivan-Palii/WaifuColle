<script setup>
import { useFirebaseDataStore } from "./store/firebaseData.js";
import { onMounted } from "vue";
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import TheSnackbar from "@/components/TheSnackbar.vue";

const { getCategories } = useFirebaseDataStore();

onMounted(async () => {
	await getCategories();
});
</script>

<template>
	<VApp>
		<TheHeader />
		<VMain class="flex-1-1">
			<VContainer>
				<RouterView />
			</VContainer>
		</VMain>
		<TheFooter />
		<TheSnackbar />
	</VApp>
</template>
