// Composables
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import MainLayout from "@/layouts/MainLayout.vue";
import HomePage from "@/views/HomePage.vue";
import CreateLayout from "@/layouts/CreateLayout.vue";
import CreateSourceComponent from "@/components/creating/CreateSourceComponent.vue";
import CreateCharacterComponent from "@/components/creating/CreateCharacterComponent.vue";
import CreateFamilyComponent from "@/components/creating/CreateFamilyComponent.vue";
import CharactersPage from "@/views/CharactersPage.vue";


const routes = [
  {
    path: '/WaifuColle',
    component: MainLayout,
    children: [
      {
        path: '/WaifuColle/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: HomePage,
      },
			{
				path: '/WaifuColle/characters',
				name: 'Characters',
				component: CharactersPage
			}
    ],
  },
	{
		path: '/WaifuColle/create',
		name: 'Create',
		component: CreateLayout,
		children: [
			{
				path: '/WaifuColle/create/source',
				name: 'CreateSource',
				component: CreateSourceComponent
			},
			{
				path: '/WaifuColle/create/character',
				name: 'CreateCharacter',
				component: CreateCharacterComponent
			},
			{
				path: '/WaifuColle/create/family',
				name: 'CreateFamily',
				component: CreateFamilyComponent
			},
		]
	}
]

const router = createRouter({

  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
})

export default router
