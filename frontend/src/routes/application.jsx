import Layout from '@components/layouts/dashboard';
import * as RM from '@root/rm';
import { lazy } from 'react';

//unAuthView
const unAuthorizedAcessView = () => import('@components/ui/UnAuthAccess');

const routes = {
	path: '/',
	Component: Layout,
	children: [
		{
			path: 'dashboard',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.DASHBOARD_VIEW)
					? import('@pages/Dashboard')
					: unAuthorizedAcessView()
			),
		},
		{
			path: 'admission',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.ADMISSION_VIEW)
					? import('@pages/Admission/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: 'admission/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.ADMISSION_VIEW)
					? import('@pages/Admission/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: 'payment',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.ADMISSION_VIEW)
					? import('@pages/Payment/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/institution',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.INSTITUTION_VIEW)
					? import('@pages/Institution/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/institution/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.INSTITUTION_VIEW)
					? import('@pages/Institution/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/campus',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.CAMPUS_VIEW)
					? import('@pages/Campus/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/campus/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.CAMPUS_VIEW)
					? import('@pages/Campus/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/department',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.DEPARTMENT_VIEW)
					? import('@pages/Department/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/department/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.DEPARTMENT_VIEW)
					? import('@pages/Department/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/program',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.PROGRAM_VIEW)
					? import('@pages/Program/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/program/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.PROGRAM_VIEW)
					? import('@pages/Program/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/quota',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.QUOTAS_VIEW)
					? import('@pages/Quota/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/quota/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.QUOTAS_VIEW)
					? import('@pages/Quota/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/seatMatrix',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.SEAT_MATRIX_VIEW)
					? import('@pages/SeatMatrix/ListPage')
					: unAuthorizedAcessView()
			),
		},
		{
			path: '/seatMatrix/:code',
			Component: lazy(() =>
				RM.helper().isAuthorized(RM.commonConfig.arnConstants.SEAT_MATRIX_VIEW)
					? import('@pages/SeatMatrix/ObjectPage')
					: unAuthorizedAcessView()
			),
		},
	],
};

export default routes;

// import Layout from '@components/layouts/dashboard';
// import * as RM from '@root/rm';

// // pages
// import DashboardPage from '@pages/dashboard';
// import AdmissionPage from '@pages/admission';
// import TrafficPage from '@pages/traffic';
// import SeatMatrixPage from '@pages/seatMatrix';
// import { default as InstitutionListPage } from '@pages/Institution/ListPage';
// import { default as InstitutionObjectPage } from '@pages/Institution/ObjectPage';
// import { default as CampusListPage } from '@pages/Campus/ListPage';
// import { default as CampusObjectPage } from '@pages/Campus/ObjectPage';
// import { default as DepartmentListPage } from '@pages/Department/ListPage';
// import { default as DepartmentObjectPage } from '@pages/Department/ObjectPage';
// import { default as ProgramListPage } from '@pages/Program/ListPage';
// import { default as ProgramObjectPage } from '@pages/Program/ObjectPage';
// import { default as QuotaListPage } from '@pages/Quota/ListPage';
// import { default as QuotaObjectPage } from '@pages/Quota/ObjectPage';
// import { default as SeatMatrixListPage } from '@pages/SeatMatrix/ListPage';
// import { default as SeatMatrixObjectPage } from '@pages/SeatMatrix/ObjectPage';
// import UnAuthAccess from '@root/components/ui/UnAuthAccess';
// import { lazy } from 'react';

// const routes = {
// 	path: '/',
// 	Component: Layout,
// 	children: [
// 		{
// 			path: 'dashboard',
// 			Component: lazy(() =>
// 				RM.helper().isAuthorized(RM.commonConfig.arnConstants.DASHBOARD_VIEW)
// 					? import('@pages/dashboard')
// 					: unAuthorizedAcessView()
// 			),
// 		},
// 		{
// 			path: 'admission',
// 			Component: AdmissionPage,
// 		},
// 		{
// 			path: '/institution',
// 			Component: InstitutionListPage,
// 		},
// 		{
// 			path: '/institution/:code',
// 			Component: InstitutionObjectPage,
// 		},
// 		{
// 			path: '/campus',
// 			Component: CampusListPage,
// 		},
// 		{
// 			path: '/campus/:code',
// 			Component: CampusObjectPage,
// 		},
// 		{
// 			path: '/department',
// 			Component: DepartmentListPage,
// 		},
// 		{
// 			path: '/department/:code',
// 			Component: DepartmentObjectPage,
// 		},
// 		{
// 			path: '/program',
// 			Component: ProgramListPage,
// 		},
// 		{
// 			path: '/program/:code',
// 			Component: ProgramObjectPage,
// 		},
// 		{
// 			path: '/quota',
// 			Component: QuotaListPage,
// 		},
// 		{
// 			path: '/quota/:code',
// 			Component: QuotaObjectPage,
// 		},
// 		{
// 			path: '/seatMatrix',
// 			Component: SeatMatrixListPage,
// 		},
// 		{
// 			path: '/seatMatrix/:code',
// 			Component: SeatMatrixObjectPage,
// 		},
// 	],
// };

// export default routes;
