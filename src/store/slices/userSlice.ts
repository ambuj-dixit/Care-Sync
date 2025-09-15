import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'audio';
}

export interface HealthRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'prescription' | 'lab-result' | 'imaging' | 'note';
  fileUrl?: string;
}

interface UserState {
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    emergencyContact: string;
  } | null;
  appointments: Appointment[];
  healthRecords: HealthRecord[];
  isLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  appointments: [],
  healthRecords: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action: PayloadAction<typeof initialState.profile>) => {
      state.profile = action.payload;
    },
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    setHealthRecords: (state, action: PayloadAction<HealthRecord[]>) => {
      state.healthRecords = action.payload;
    },
    addHealthRecord: (state, action: PayloadAction<HealthRecord>) => {
      state.healthRecords.push(action.payload);
    },
  },
});

export const {
  setLoading,
  setProfile,
  setAppointments,
  addAppointment,
  updateAppointment,
  setHealthRecords,
  addHealthRecord,
} = userSlice.actions;

export default userSlice.reducer;