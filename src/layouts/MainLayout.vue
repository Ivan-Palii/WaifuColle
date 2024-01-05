<script setup></script>
<template>
	<VAppBar color="secondary" density="compact">
		<template #prepend>
			<VBtn :to="{ name: 'Characters' }">Characters</VBtn>
		</template>
	</VAppBar>
	<RouterView />
</template>
<style scoped lang="scss">
.v-btn.v-btn--active {
	--v-activated-opacity: 0;
}
</style>
