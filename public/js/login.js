import axios from 'axios';
import { showAlert } from './alert';

export const loginUser = async (email, password) => {
	try {
		const resp = await axios({
			method: 'POST',
			url: '/api/v1/auth/login',
			data: {
				email,
				password,
			},
		});

		if (resp.data.status === 'success') {
			showAlert('success', 'Logged in successfully!', 800);

			window.setTimeout(() => {
				location.replace('/');
			}, 1000);
		}
	} catch (err) {
		showAlert('error', err.response.data.message);
	}
};

export const logoutUser = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: '/api/v1/auth/logout',
		});

		if (res.data.status === 'success') {
			window.setTimeout(() => {
				showAlert('success', 'Logged out successfully!');
				const { pathname } = window.location;
				if (pathname === '/me' || pathname === '/my-tours') {
					window.location.replace('/');
				} else {
					location.reload(true);
				}
			}, 1000);
		}
	} catch (err) {
		showError('error', 'Error logging out, try again!');
	}
};
