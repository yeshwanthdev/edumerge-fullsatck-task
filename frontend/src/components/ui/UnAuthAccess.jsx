import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const UnAuthAccess = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				direction: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				p: 2,
			}}>
			<Typography variant="h4" gutterBottom>
				403
			</Typography>

			<Typography variant="h6" gutterBottom>
				Unauthorized Access
			</Typography>

			{/* <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				You do not have permission to access this page.
			</Typography> */}

			<Button variant="contained" onClick={() => navigate('/')}>
				Go to Home
			</Button>
		</Box>
	);
};

export default UnAuthAccess;
