import * as RM from '@root/rm';
import enums from '@root/config/enums';

class Helper {
	get user() {
		try {
			const user = localStorage.getItem('userInfo');
			// const policies = localStorage.getItem("policies");

			if (RM.lodash.isEmpty(user)) return {};

			const parsedData = JSON.parse(user);

			return {
				...parsedData,
				firstName: parsedData.firstName,
				lastName: parsedData.lastName,
				email: parsedData.email,
				policies: parsedData.policies,
				code: parsedData.code,
				roleName: parsedData.role?.name,
				roleTypeCode: parsedData.roleType?.code,
			};
		} catch (error) {
			console.error('Failed to get user info:', error.message);
			return {};
		}
	}

	isAuthorized(arn) {
		try {
			const policies = this.user.policies || [];
			return RM.lodash.includes(policies, arn);
		} catch (err) {
			console.error('Error while authorizing:', err);
			return false;
		}
	}
}

export default new Helper();
