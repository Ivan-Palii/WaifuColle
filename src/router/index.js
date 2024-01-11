// Composables
import { createRouter, createWebHashHistory } from "vue-router";

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
			},
		],
	},
	{
		path: "/create",
		name: "Create",
		component: CreateLayout,
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
			},
			{
				path: "/auth/registration",
				name: "Registration",
				component: RegistrationPage,
			},
		],
	},
];

const router = createRouter({
	// history: createWebHistory(process.env.BASE_URL),
	history: createWebHashHistory(),
	routes,
});

export default router;
