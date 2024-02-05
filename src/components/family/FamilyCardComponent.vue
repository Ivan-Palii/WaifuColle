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
	<VCol cols="12"  md="6" sm="12" class="pa-4">
		<VCard variant="outlined" class="pa-4">
			<VRow>
				<VCol
					cols="12"
					md="6"
					sm="12"
				>
					<VAvatar
						variant="outlined"
						rounded="0"
						size="250"
					>
						<VRow class="justify-center pa-3">
							<VCol
								v-for="pfp in family.pfpSrc"
								:cols="family.pfpSrc.length <= 1 ? 12 : 6"
								:key="pfp"
								class="ma-0 pa-0"
							>
								<VImg :src="pfp"/>
							</VCol>
						</VRow>
					</VAvatar>
					<VCardTitle>{{ family.name }}</VCardTitle>
					<VCardSubtitle>
						<!--					{{ sourceCategory.name }}: {{ source.name }}-->
					</VCardSubtitle>
				</VCol>
			</VRow>
		</VCard>
	</VCol>
</template>
<style scoped lang="scss"></style>
