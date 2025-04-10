// frontend/src/pages/AdminDashboard.js
import React, { useContext, useEffect } from 'react';
import { styled} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {  TextField } from '@mui/material';
import { 
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Grid,
    Card,
    CardContent
  } from '@mui/material';
import AuthContext from '../context/authContext';
import AppointmentContext from '../context/appointmentContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  card: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { 
    appointments, 
    doctors, 
    getAppointments, 
    getDoctors,
    loading 
  } = useContext(AppointmentContext);

  useEffect(() => {
    getAppointments();
    getDoctors();
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5" component="h2">
                {doctors.length + 1} {/* +1 for admin */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Doctors
              </Typography>
              <Typography variant="h5" component="h2">
                {doctors.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Appointments
              </Typography>
              <Typography variant="h5" component="h2">
                {appointments.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>Recent Appointments</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.slice(0, 5).map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.patient?.name || 'N/A'}</TableCell>
                  <TableCell>{appointment.doctor?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{appointment.timeSlot}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      size="small"
                      color={
                        appointment.status === 'completed' ? 'primary' :
                        appointment.status === 'confirmed' ? 'secondary' :
                        'default'
                      }
                    >
                      {appointment.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;