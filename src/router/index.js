// Composables
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserDataStore } from "@/store/userData.js";
import { useSnackbarStore } from "@/store/snackbarStore.js";

import MainLayout from "@/layouts/MainLayout.vue";
import HomePage from "@/views/HomePage.vue";
import CreateLayout from "@/layouts/CreateLayout.vue";
import CreateSourceComponent from "@/components/creating/CreateSourceComponent.vue";
import CreateCharacterComponent from "@/components/creating/CreateCharacterComponent.vue";
import CreateFamilyComponent from "@/components/creating/CreateFamilyComponent.vue";
import CharactersPage from "@/views/CharactersPage.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import LogInPage from "@/views/auth/logInPage.vue";
import RegistrationPage from "@/views/auth/registrationPage.vue";
import { storeToRefs } from "pinia";

const routes = [
	{
		path: "/",
		component: MainLayout,
		children: [
			{
				path: "",
				name: "Home",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: HomePage,
			},
			{
				path: "/characters",
				name: "Characters",
				component: CharactersPage,
				meta: { userAccess: true },
			},
		],
	},
	{
		path: "/create",
		name: "Create",
		component: CreateLayout,
		meta: { redactorAccess: true },
		children: [
			{
				path: "/create/source",
				name: "CreateSource",
				component: CreateSourceComponent,
			},
			{
				path: "/create/character",
				name: "CreateCharacter",
				component: CreateCharacterComponent,
			},
			{
				path: "/create/family",
				name: "CreateFamily",
				component: CreateFamilyComponent,
			},
		],
	},
	{
		path: "/auth",
		component: AuthLayout,
		children: [
			{
				path: "/auth/login",
				name: "Login",
				component: LogInPage,
				meta: { hideLogged: true },
			},
			{
				path: "/auth/registration",
				name: "Registration",
				component: RegistrationPage,
				meta: { hideLogged: true },
			},
		],
	},
];

const router = createRouter({
	// history: createWebHistory(process.env.BASE_URL),
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const { user, userDetails } = storeToRefs(useUserDataStore());
	const { setSnackbarParams } = useSnackbarStore();
	const authReq = to.matched.some((route) => route.meta.userAccess);
	const redactorReq = to.matched.some((route) => route.meta.redactorAccess);
	const adminReq = to.matched.some((route) => route.meta.adminAccess);
	const noAuthReq = to.matched.some((route) => route.meta.hideLogged);
	// , adminAccess: true


	if ((authReq || redactorReq || adminReq) && !user.value) {
		next({ name: "Home" });
		setSnackbarParams({
			isOpen: true,
			message: "Not an authorized user, please log in",
			color: "yellow",
		});
		return;
	}

	if (
		redactorReq &&
		!(
			userDetails.value.role.id === "REDACTOR" ||
			userDetails.value.role.id === "ADMIN"
		)
	) {
		next({ name: "Home" });
		setSnackbarParams({
			isOpen: true,
			message: "Not enough permission level. Access denied",
			color: "red",
		});
		return;
	}

	if (adminReq && userDetails.value.role.id !== "ADMIN") {
		next({ name: "Home" });
		setSnackbarParams({
			isOpen: true,
			message: "Not enough permission level. Access denied",
			color: "red",
		});
		return;
	}

	if (noAuthReq && !!user.value) {
		next({ name: "Home" });

		setSnackbarParams({
			isOpen: true,
			message: "You are already logged in",
			color: "yellow",
		});
		return;
	} else {
		next();
		return;
	}
});

export default router;
