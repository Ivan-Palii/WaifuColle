// Composables
import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from "@/layouts/MainLayout.vue";
import HomePage from "@/views/HomePage.vue";
import CreateLayout from "@/layouts/CreateLayout.vue";
import CreateSourceComponent from "@/components/creating/CreateSourceComponent.vue";
import CreateCharacterComponent from "@/components/creating/CreateCharacterComponent.vue";
import CreateFamilyComponent from "@/components/creating/CreateFamilyComponent.vue";


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: HomePage,
      },
    ],
  },
	{
		path: '/create',
		name: 'Create',
		component: CreateLayout,
		children: [
			{
				path: '/create/source',
				name: 'CreateSource',
				component: CreateSourceComponent
			},
			{
				path: '/create/character',
				name: 'CreateCharacter',
				component: CreateCharacterComponent
			},
			{
				path: '/create/family',
				name: 'CreateFamily',
				component: CreateFamilyComponent
			},
		]
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
