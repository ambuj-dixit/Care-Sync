import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import userSlice from './slices/userSlice';
import doctorSlice from './slices/doctorSlice';
import pharmacySlice from './slices/pharmacySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    user: userSlice,
    doctor: doctorSlice,
    pharmacy: pharmacySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;