import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  consultationFee: number;
  isAvailable: boolean;
  languages: string[];
  education: string[];
  photoURL?: string;
  about: string;
}

export interface DoctorAppointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'audio';
  symptoms?: string;
  notes?: string;
}

interface DoctorState {
  doctors: Doctor[];
  currentDoctor: Doctor | null;
  appointments: DoctorAppointment[];
  availability: { [key: string]: string[] }; // date -> time slots
  isLoading: boolean;
}

const initialState: DoctorState = {
  doctors: [],
  currentDoctor: null,
  appointments: [],
  availability: {},
  isLoading: false,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
    },
    setCurrentDoctor: (state, action: PayloadAction<Doctor>) => {
      state.currentDoctor = action.payload;
    },
    setAppointments: (state, action: PayloadAction<DoctorAppointment[]>) => {
      state.appointments = action.payload;
    },
    addAppointment: (state, action: PayloadAction<DoctorAppointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<DoctorAppointment>) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    setAvailability: (state, action: PayloadAction<{ [key: string]: string[] }>) => {
      state.availability = action.payload;
    },
    updateAvailability: (state, action: PayloadAction<{ date: string; slots: string[] }>) => {
      state.availability[action.payload.date] = action.payload.slots;
    },
  },
});

export const {
  setLoading,
  setDoctors,
  setCurrentDoctor,
  setAppointments,
  addAppointment,
  updateAppointment,
  setAvailability,
  updateAvailability,
} = doctorSlice.actions;

export default doctorSlice.reducer;