import React, { useEffect, useContext } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useAuth } from '../context/authContext';
import  AppointmentContext  from '../context/appointmentContext';

export default function Appointments() {
  const { user } = useAuth();
  const { appointments, getAppointments } = useContext(AppointmentContext);

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>My Appointments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>{user.role === 'patient' ? 'Doctor' : 'Patient'}</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>{appointment.timeSlot}</TableCell>
                <TableCell>
                  {user.role === 'patient' 
                    ? appointment.doctor?.name 
                    : appointment.patient?.name}
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small" color={
                    appointment.status === 'completed' ? 'success' :
                    appointment.status === 'confirmed' ? 'primary' : 'warning'
                  }>
                    {appointment.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}