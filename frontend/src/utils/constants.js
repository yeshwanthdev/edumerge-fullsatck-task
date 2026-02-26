export const dummyUsers = {
	admin: {
		firstName: 'Admin',
		lastName: 'User',
		email: 'admin@example.com',
		policies: [
			'app:institution:create',
			'app:institution:update',
			'app:institution:view',
			'app:institution:delete',

			'app:campus:create',
			'app:campus:update',
			'app:campus:view',
			'app:campus:delete',

			'app:department:create',
			'app:department:update',
			'app:department:view',
			'app:department:delete',

			'app:program:create',
			'app:program:update',
			'app:program:view',
			'app:program:delete',

			'app:quotas:create',
			'app:quotas:update',
			'app:quotas:view',
			'app:quotas:delete',

			'app:seatMatrix:create',
			'app:seatMatrix:update',
			'app:seatMatrix:view',
			'app:seatMatrix:delete',
		],
		code: 'ADM001',
		role: {
			name: 'Administrator',
		},
		roleType: {
			code: 'ADMIN',
		},
	},

	admissionOfficer: {
		firstName: 'AdmissionOff,',
		lastName: 'User',
		email: 'admission@example.com',
		policies: ['app:admission:create', 'app:admission:update', 'app:admission:view', 'app:admission:delete'],
		code: 'MGR001',
		role: {
			name: 'Manager',
		},
		roleType: {
			code: 'MANAGER',
		},
	},

	management: {
		firstName: 'Management,',
		lastName: 'User',
		email: 'management@example.com',
		policies: ['app:dashboard:view'],
		code: 'USR001',
		role: {
			name: 'Standard User',
		},
		roleType: {
			code: 'USER',
		},
	},
};

export const tableStyles = {
	'& .MuiDataGrid-cell:focus': {
		outline: 'none',
	},
	'& .MuiDataGrid-cell:focus-within': {
		outline: 'none',
	},
};
