<script setup>
import { reactive } from "vue";

const props = defineProps({
	character: {
		type: Object,
		required: true,
	},
});

const params = reactive({
	color: props.character.status ? "green" : "red",
	message: props.character.status ? "Alive" : "Dead",
});
</script>
<template>
	<VContainer class="wrap lighten-5 pa-4">
		<VHover #default="{ isHovering, props }">
			<VCard  v-bind="props" :elevation="isHovering ? 24 : 6" variant="outlined">
				<VRow class="ma-0">
					<div class="pa-4">
						<VAvatar size="100" style="border: 1px solid black">
							<VImg :src="character.pfpSrc" />
						</VAvatar>
					</div>
					<div class="d-flex flex-column">
						<VCardTitle>
							{{ character.name }}
						</VCardTitle>
						<div class="d-flex justify-center align-center pl-4">
							<VAvatar :color="params.color" size="14" />
							<VCardText
								:class="{
									'text-green-accent-4': character.status,
									'text-red-accent-4': !character.status,
								}"
								class="pa-1 pl-2 text-wrap"
							>
								{{ params.message }}
							</VCardText>
						</div>
					</div>
				</VRow>
			</VCard>
		</VHover>
	</VContainer>
</template>
<style scoped lang="scss"></style>
