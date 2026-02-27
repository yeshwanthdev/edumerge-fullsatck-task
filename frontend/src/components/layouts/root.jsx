import * as React from 'react';
import * as RM from '@root/rm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import { DialogsProvider } from '@toolpad/core';

import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DomainIcon from '@mui/icons-material/Domain';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const isDashboardHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.DASHBOARD_VIEW);
const isAdmissionHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.ADMISSION_VIEW);
const isInstitutionHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.INSTITUTION_VIEW);
const isCampusHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.CAMPUS_VIEW);
const isDepartmentHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.DEPARTMENT_VIEW);
const isProgramHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.PROGRAM_VIEW);
const isQuotaHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.QUOTAS_VIEW);
const isSeatMatrixHidden = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.SEAT_MATRIX_VIEW);

const isMainTitleHidden = isDashboardHidden && isAdmissionHidden;
const isMasterDataHidden =
	isInstitutionHidden && isCampusHidden && isDepartmentHidden && isProgramHidden && isQuotaHidden && isSeatMatrixHidden;

const NAVIGATION = [
	{
		kind: 'header',
		title: 'Main items',
		hidden: isMainTitleHidden,
	},
	{
		segment: 'dashboard',
		title: 'Dashboard',
		icon: <DashboardIcon />,
		hidden: isDashboardHidden,
	},
	{
		segment: 'admission',
		title: 'Admission',
		icon: <DescriptionIcon />,
		hidden: isAdmissionHidden,
	},
	{
		segment: 'payment',
		title: 'Payment',
		icon: <DescriptionIcon />,
		hidden: isAdmissionHidden,
	},
	{
		kind: 'divider',
		hidden: isMasterDataHidden || isMainTitleHidden,
	},
	{
		kind: 'header',
		title: 'Master Data',
		hidden: isMasterDataHidden,
	},

	{
		segment: '',
		title: 'Configuration',
		icon: <BarChartIcon />,
		hidden: isMasterDataHidden,
		children: [
			{
				segment: 'institution',
				title: 'Institution',
				icon: <AccountBalanceIcon />, // main college entity
				hidden: isInstitutionHidden,
			},
			{
				segment: 'campus',
				title: 'Campus',
				icon: <DomainIcon />, // campus/buildings
				hidden: isCampusHidden,
			},
			{
				segment: 'department',
				title: 'Department',
				icon: <CorporateFareIcon />, // academic division
				hidden: isDepartmentHidden,
			},
			{
				segment: 'program',
				title: 'Program',
				icon: <MenuBookIcon />, // academic program/course
				hidden: isProgramHidden,
			},
			{
				segment: 'quota',
				title: 'Quota',
				icon: <DonutLargeIcon />, // allocation/seat distribution
				hidden: isQuotaHidden,
			},
		],
	},
	{
		segment: 'seatMatrix',
		title: 'Seat Matrix',
		icon: <LayersIcon />,
		hidden: isSeatMatrixHidden,
	},
];

export const filterHiddenNavigation = (navItems) => {
	if (!Array.isArray(navItems)) return [];

	return navItems
		.filter((item) => !item.hidden) // remove hidden items
		.map((item) => {
			const newItem = { ...item };
			if (item.children) {
				newItem.children = filterHiddenNavigation(item.children); // recursive
			}
			return newItem;
		});
};
const BRANDING = {
	title: 'Toolpad',
};

export default function Root() {
	return (
		<DialogsProvider>
			<ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
				<Outlet />
			</ReactRouterAppProvider>
		</DialogsProvider>
	);
}
