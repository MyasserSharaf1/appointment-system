// frontend/src/context/appointmentContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all appointments
  const getAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/appointments');
      setAppointments(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get appointments');
    } finally {
      setLoading(false);
    }
  };

  // Get doctor appointments
  const getDoctorAppointments = async (doctorId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/appointments?doctor=${doctorId}`);
      setAppointments(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get doctor appointments');
    } finally {
      setLoading(false);
    }
  };

  // Create appointment
  const createAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/appointments', appointmentData);
      setAppointments([...appointments, res.data.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/appointments/${appointmentId}`, { status });
      setAppointments(appointments.map(appt => 
        appt._id === appointmentId ? res.data.data : appt
      ));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get all doctors
  const getDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/doctors');
      setDoctors(res.data.data.filter(user => user.role === 'doctor'));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get doctors');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        doctors,
        loading,
        error,
        getAppointments,
        getDoctorAppointments,
        createAppointment,
        updateAppointmentStatus,
        getDoctors
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;