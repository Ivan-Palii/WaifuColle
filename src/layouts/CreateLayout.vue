<script setup>
import { reactive, ref } from "vue";

const drawer = ref(false);

const routes = reactive([
	{
		title: "Create source",
		to: { name: "CreateSource" },
	},
	{
		title: "Create character",
		to: { name: "CreateCharacter" },
	},
	{
		title: "Create family",
		to: { name: "CreateFamily" },
	},
]);

</script>
<template>
	<VAppBar color="secondary" density="compact">
		<template #prepend>
			<div class="hidden-xs">
				<VBtn v-for="(route, index) in routes" :to="route.to" :key="index">
					{{ route.title }}
				</VBtn>
			</div>
			<div class="hidden-sm-and-up">
				<VBtn icon="mdi-menu" @click.prevent="drawer = !drawer" />
			</div>
		</template>
	</VAppBar>
	<VNavigationDrawer
		v-model="drawer"
		class="position-fixed"
		disable-resize-watcher
	>
		<VList>
			<VListItem
				v-for="(route, index) in routes"
				:to="route.to"
				:key="index"
				link
			>
				{{ route.title }}
			</VListItem>
		</VList>
	</VNavigationDrawer>
	<h2>CREATE LAYOUT</h2>


	<RouterView />
</template>
<style scoped lang="scss">
.v-btn.v-btn--active {
	--v-activated-opacity: 0;
}
</style>
