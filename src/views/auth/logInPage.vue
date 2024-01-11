<script setup>
import { useSnackbarStore } from "@/store/snackbarStore.js";
import { useUserDataStore } from "@/store/userData.js";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();
const { setSnackbarParams } = useSnackbarStore();
const { logIn } = useUserDataStore();
const userData = reactive({
	email: "",
	password: "",
});

async function loginUserForm() {
	await logIn(userData);
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
		<VCardTitle>Log In</VCardTitle>
		<VForm @submit.prevent="loginUserForm">
			<VContainer>
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
					Don't have an account?
					<RouterLink :to="{ name: 'Registration' }">Register!</RouterLink>
				</div>
				<VBtn class="mt-4" variant="outlined" text="Log In" type="submit" />
			</VContainer>
		</VForm>
	</VCard>
</template>
<style scoped lang="scss"></style>
