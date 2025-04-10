import React, { useEffect, useContext } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { useAuth } from '../context/authContext';
import  AppointmentContext  from '../context/appointmentContext';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { appointments, getDoctorAppointments, updateAppointmentStatus } = useContext(AppointmentContext);

  useEffect(() => {
    if (user?._id) getDoctorAppointments(user._id);
  }, [user]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    await updateAppointmentStatus(appointmentId, newStatus);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment.patient?.name}</TableCell>
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>{appointment.timeSlot}</TableCell>
                <TableCell>
                  <Select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}