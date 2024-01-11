<script setup>
import { useUserDataStore } from "@/store/userData.js";
import { reactive } from "vue";

const { logIn } = useUserDataStore();
const userData = reactive({
	email: "",
	password: "",
});

async function loginUserForm() {
	logIn(userData);
}
</script>
<template>
	<h2>Login</h2>
	<VCard>
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
				<VBtn variant="outlined" text="Create" type="submit" />
			</VContainer>
		</VForm>
	</VCard>
	<span>
		Don't have an account?
		<RouterLink :to="{ name: 'Registration' }">Register!</RouterLink>
	</span>
</template>
<style scoped lang="scss"></style>
