import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useSnackbarStore = defineStore('snackbarStore', () => {
	const snackbar = reactive({
		state: {
			isOpen: false,
			message: '',
			color: ''
		}
	});
	const setSnackbarParams = params => {
		snackbar.state = params;
	};

	return { snackbar, setSnackbarParams };
});
