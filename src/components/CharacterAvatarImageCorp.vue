<script setup>
import { reactive, ref } from "vue";
import VuePictureCropper, { cropper } from "vue-picture-cropper";

const props = defineProps({
	aspectRatioProp: {
		required: true,
		type: Number,
	},
});
const emit = defineEmits(["image"]);
const isShowModal = ref(false);
const uploadInput = ref(null);
const pic = ref("");
const result = reactive({
	dataURL: "",
	blobURL: "",
});

/**
 * Select the picture to be cropped
 */
function selectFile(e) {
	// Reset last selection and results
	pic.value = "";
	result.dataURL = "";
	// result.blobURL = "";

	// Get selected files
	const { files } = e.target;
	if (!files || !files.length) return;

	// Convert to dataURL and pass to the cropper component
	const file = files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		// Update the picture source of the `img` prop
		pic.value = String(reader.result);

		// Show the modal
		isShowModal.value = true;

		// Clear selected files of input element
		if (!uploadInput.value) return;
		uploadInput.value.value = "";
	};
}

/**
 * Get cropping results
 */
async function getResult() {
	if (!cropper) return;
	const base64 = cropper.getDataURL();
	// const blob = await cropper.getBlob();
	// if (!blob) return;
	if (!base64) return;

	// const file = await cropper.getFile({
	// 	fileName: locales.fileName,
	// });

	// console.log({ base64, blob, file });
	result.dataURL = base64;
	// result.blobURL = URL.createObjectURL(blob);
	// console.log(result.dataURL);
	emit("image", result.dataURL);
	isShowModal.value = false;
}

/**
 * Reset the default cropping area
 */
function reset() {
	if (!cropper) return;
	cropper.reset();
}

/**
 * The ready event passed to Cropper.js
 */
function ready() {
	// console.log("Cropper is ready.");
}
</script>
<template>
	<div>
		<!--		<VAvatar size="200" style="border: 1px solid black">
			<VImg :src="result.blobURL" />
		</VAvatar>-->
		<VDialog v-model="isShowModal" width="500" persistent>
			<template #activator>
				<VBtn
					class="select-picture"
					variant="outlined"
					@click="$refs.uploadInput.click()"
				>
					<span>Upload image</span>
					<input
						ref="uploadInput"
						type="file"
						accept="image/*"
						hidden
						@change="selectFile"
					/>
				</VBtn>
			</template>
			<VCard title="Image" class="pa-4">
				<VCardText>Choose character profile picture</VCardText>
				<VCardActions>
					<VSpacer />
					<VBtn text="Cancel" class="btn" @click="isShowModal = false" />
					<VBtn text="Reset" class="btn" @click="reset" />
					<VBtn text="Crop" class="btn primary" @click="getResult" />
				</VCardActions>
				<div>
					<VuePictureCropper
						:boxStyle="{
							width: '100%',
							height: '100%',
							backgroundColor: '#f8f8f8',
							margin: 'auto',
						}"
						:img="pic"
						:options="{
							viewMode: 1,
							dragMode: 'crop',
							aspectRatio: aspectRatioProp,
						}"
						@ready="ready"
					/>
				</div>
			</VCard>
		</VDialog>
	</div>
</template>
<style scoped lang="scss"></style>
