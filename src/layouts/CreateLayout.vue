<script setup></script>
<template>
	<VAppBar color="secondary" density="compact">
		<template #prepend>
			<VBtn :to="{ name: 'CreateSource' }">Create source</VBtn>
			<VBtn :to="{ name: 'CreateCharacter' }">Create character</VBtn>
			<VBtn :to="{ name: 'CreateFamily' }">Create family</VBtn>
		</template>
	</VAppBar>
	<h2>CREATE LAYOUT</h2>

	<RouterView />
</template>
<style scoped lang="scss">
.v-btn.v-btn--active {
	--v-activated-opacity: 0;
}
</style>
