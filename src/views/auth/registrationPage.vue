<script setup>
import { useSnackbarStore } from "@/store/snackbarStore.js";
import { useUserDataStore } from "@/store/userData.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const { setSnackbarParams } = useSnackbarStore();
const router = useRouter();
const { user, userDetails } = storeToRefs(useUserDataStore());
const { registerUser } = useUserDataStore();
const userData = reactive({
	email: "",
	password: "",
	displayName: "",
});

async function registerUserForm() {
	await registerUser(userData);

	router.push({ name: "Home" });
}
</script>
<template>
	<VCard
		:elevation="8"
		class="rounded ma-auto mt-8"
		variant="outlined"
		max-width="400"
	>
		<VCardTitle>Registration</VCardTitle>
		<VForm @submit.prevent="registerUserForm">
			<VContainer>
				<VTextField
					v-model="userData.displayName"
					type="text"
					label="Nickname"
					variant="outlined"
				/>
				<VTextField
					v-model="userData.email"
					type="email"
					label="Email"
					variant="outlined"
				/>
				<VTextField
					v-model="userData.password"
					type="password"
					label="Password"
					variant="outlined"
				/>
				<div>
					Have account?
					<RouterLink :to="{ name: 'Login' }">Log In!</RouterLink>
				</div>
				<VBtn class="mt-4" variant="outlined" text="Register" type="submit" />
			</VContainer>
		</VForm>
	</VCard>
</template>
<style scoped lang="scss"></style>
