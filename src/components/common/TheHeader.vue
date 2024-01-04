<script setup></script>
<template>
	<VAppBar color="primary">
		<template #prepend>
			<VBtn :to="{ name: 'Home' }"> Home</VBtn>
			<VBtn :to="{ name: 'Create' }"> Create Page</VBtn>
		</template>
	</VAppBar>
</template>
<style scoped lang="scss">
.v-btn.v-btn--active {
	--v-activated-opacity: 0;
}
</style>
