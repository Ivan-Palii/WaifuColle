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
		<VCol cols="12" md="6" sm="12">
			<FamilyCardComponent
				v-for="family in families"
				:family="family"
				:key="family.id"
			/>
		</VCol>
	</VRow>
</template>
<style scoped lang="scss"></style>
