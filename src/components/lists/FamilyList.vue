<script setup>
import FamilyCardComponent from "@/components/family/FamilyCardComponent.vue";

const props = defineProps({
	families: {
		required: true,
		type: Array,
	},
});
</script>
<template>
	<VRow>
		<FamilyCardComponent
			v-for="family in families"
			:family="family"
			:key="family.id"
		/>
	</VRow>
</template>
<style scoped lang="scss"></style>
