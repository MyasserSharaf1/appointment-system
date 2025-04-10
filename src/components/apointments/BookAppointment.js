// frontend/src/components/appointments/BookAppointment.js
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import AuthContext from '../../context/authContext';
import AppointmentContext from '../../context/appointmentContext';

const validationSchema = Yup.object().shape({
  doctor: Yup.string().required('Doctor is required'),
  date: Yup.date().required('Date is required'),
  timeSlot: Yup.string().required('Time slot is required'),
  notes: Yup.string()
});

const BookAppointment = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { doctors, getDoctors, createAppointment } = useContext(AppointmentContext);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getDoctors();
  }, []);

  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const time = new Date(date);
      time.setHours(hour, 0, 0, 0);
      slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    return slots;
  };

  return (
    <Paper style={{ padding: 24, maxWidth: 800, margin: '20px auto' }}>
      <Typography variant="h5" gutterBottom>Book New Appointment</Typography>
      
      <Formik
        initialValues={{ doctor: '', date: new Date(), timeSlot: '', notes: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await createAppointment({
              doctor: values.doctor,
              patient: user._id,
              date: values.date,
              timeSlot: values.timeSlot,
              notes: values.notes,
              status: 'pending'
            });
            history.push('/appointments');
          } catch (err) {
            setErrors({ form: err.response?.data?.error || 'Failed to book appointment' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Doctor</InputLabel>
                  <Select
                    name="doctor"
                    value={values.doctor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.doctor && Boolean(errors.doctor)}
                    label="Doctor"
                  >
                    {doctors.map(doctor => (
                      <MenuItem key={doctor._id} value={doctor._id}>
                        {doctor.name} ({doctor.specialization})
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.doctor && errors.doctor && (
                    <Typography color="error" variant="caption">{errors.doctor}</Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Appointment Date"
                  inputVariant="outlined"
                  fullWidth
                  margin="normal"
                  value={values.date}
                  onChange={date => {
                    setFieldValue('date', date);
                    setSelectedDate(date);
                    setAvailableSlots(generateTimeSlots(date));
                  }}
                  minDate={new Date()}
                  disablePast
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Time Slot</InputLabel>
                  <Select
                    name="timeSlot"
                    value={values.timeSlot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.timeSlot && Boolean(errors.timeSlot)}
                    label="Time Slot"
                    disabled={!values.date}
                  >
                    {availableSlots.map(slot => (
                      <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                    ))}
                  </Select>
                  {touched.timeSlot && errors.timeSlot && (
                    <Typography color="error" variant="caption">{errors.timeSlot}</Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="notes"
                  label="Notes (Optional)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                {errors.form && (
                  <Typography color="error" style={{ marginBottom: 16 }}>
                    {errors.form}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Book Appointment'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default BookAppointment;