<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useUserDataStore } from "@/store/userData.js";
import { storeToRefs } from "pinia";

const { user, userDetails } = storeToRefs(useUserDataStore());
const { logOut } = useUserDataStore();
const route = useRoute();
const router = useRouter();
const currentRouteName = computed(() => route.name);

async function logOutUser() {
	await logOut();
	router.push({ name: "Home" });
}
</script>
<template>
	<VAppBar color="primary">
		<template #prepend>
			<VBtn :to="{ name: 'Home' }"> Home</VBtn>
			<VBtn :to="{ name: 'Create' }"> Create Page</VBtn>
		</template>
		<template #append>
			<VBtn
				v-if="
					currentRouteName !== 'Login' &&
					currentRouteName !== 'Registration' &&
					!user
				"
				:to="{ name: 'Login' }"
				variant="text"
				icon="mdi-login"
			/>
			<VMenu v-if="user" bottom min-width="200" rounded offset-y>
				<template #activator="{ props }">
					<VBtn icon x-medium v-bind="props">
						<VAvatar color="pink" size="36">
							<!--							<VImg-->
							<!--								v-if="loggedUser.img"-->
							<!--								:src="loggedUser.img"-->
							<!--								alt=" "-->
							<!--							/>-->
							<span class="white--text">
								{{ userDetails?.initials }}
							</span>
						</VAvatar>
					</VBtn>
				</template>
				<VCard class="pa-2">
					<VList class="justify-center">
						<div class="mx-auto text-center">
							<VAvatar color="pink">
								<!--								<VImg v-if="loggedUser.img" :src="loggedUser.img" alt=" " />-->
								<span class="white--text text-h6">
									{{ userDetails?.initials }}
								</span>
							</VAvatar>
							<h4 class="my-1">{{ userDetails?.displayName }}</h4>
							<VDivider class="my-2" />
							<VBtn
								variant="text"
								depressed
								rounded
								text="Go To Personal Page (TODO)"
							/>
							<VDivider class="my-2" />
							<VBtn
								variant="text"
								depressed
								rounded
								text="Logout"
								@click="logOutUser"
							/>
						</div>
					</VList>
				</VCard>
			</VMenu>
		</template>
	</VAppBar>
</template>
<style scoped lang="scss">
.v-btn.v-btn--active {
	--v-activated-opacity: 0;
}
</style>
