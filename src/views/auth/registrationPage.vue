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
	setSnackbarParams({
		isOpen: true,
		message: "Registration completed successfully",
		color: "green",
	});
	router.push({ name: "Home" });
}
</script>
<template>
	<h2>Registration</h2>
	<VCard>
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
				<VBtn variant="outlined" text="Create" type="submit" />
			</VContainer>
		</VForm>
	</VCard>
</template>
<style scoped lang="scss"></style>
