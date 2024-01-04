<script setup>
const props = defineProps({
	family: {
		type: Object,
		required: true,
	},
/*	sourceCategory: {
		type: Object,
		required: true,
	},
	source: {
		type: Object,
		required: true,
	},*/
});
</script>
<template>
	<VCard>
		<VRow>
			<VCol cols="12" xxl="2" xl="3" md="5" sm="4">
				<VCardTitle>{{ family.name }}</VCardTitle>
				<VCardSubtitle>
<!--					{{ sourceCategory.name }}: {{ source.name }}-->
				</VCardSubtitle>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped lang="scss"></style>
