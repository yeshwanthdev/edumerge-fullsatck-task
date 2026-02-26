import * as RM from '@root/rm';
import { dummyUsers } from '@root/utils/constants';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo');
		if (userInfo) {
			localStorage.removeItem('userInfo');
			window.location.reload();
		}
	}, []);

	const users = [
		{ id: 'admin', name: 'Admin' },
		{ id: 'admissionOfficer', name: 'admissionOfficer' },
		{ id: 'management', name: 'Management' },
		{ id: 'credentials', name: 'Email and Password' },
	];

	const handleSignIn = async (provider) => {
		let userInfo = {};
		if (provider.id === 'admin') {
			userInfo = dummyUsers.admin;
		}
		if (provider.id === 'admissionOfficer') {
			userInfo = dummyUsers.admissionOfficer;
		}

		if (provider.id === 'management') {
			userInfo = dummyUsers.management;
		}

		if (!RM.lodash.isEmpty(userInfo)) {
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
		}
		await new Promise((resolve) => {
			setTimeout(() => {
				console.log(`Sign in with ${provider.id}`);
				resolve();
			}, 500);
		});

		navigate('/dashboard');
	};

	return <SignInPage providers={users} signIn={handleSignIn} />;
}
