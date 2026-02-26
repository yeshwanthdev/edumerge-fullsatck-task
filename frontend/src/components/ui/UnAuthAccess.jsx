import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UnAuthAccess() {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				gap: 2,
				px: 2,
			}}>
			<Typography variant="h4">403 — Unauthorized</Typography>
			<Typography color="text.secondary">You don’t have permission to view this page.</Typography>
			<Button variant="contained" onClick={() => navigate('/')}>
				Go Home
			</Button>
		</Box>
	);
}
