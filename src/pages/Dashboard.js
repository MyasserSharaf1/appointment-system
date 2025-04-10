import React from 'react';
import { Typography, Container } from '@mui/material';
import { useAuth } from '../context/authContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Typography>
        {user?.role === 'admin' ? 'Admin Dashboard' : 
         user?.role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
      </Typography>
    </Container>
  );
}