import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Medicine {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  manufacturer: string;
  inStock: boolean;
  quantity: number;
  unit: string;
  prescriptionRequired: boolean;
  imageUrl?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isVerified: boolean;
  rating: number;
  isOpen: boolean;
  medicines: Medicine[];
}

interface PharmacyState {
  pharmacies: Pharmacy[];
  currentPharmacy: Pharmacy | null;
  medicines: Medicine[];
  searchResults: Medicine[];
  isLoading: boolean;
}

const initialState: PharmacyState = {
  pharmacies: [],
  currentPharmacy: null,
  medicines: [],
  searchResults: [],
  isLoading: false,
};

const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPharmacies: (state, action: PayloadAction<Pharmacy[]>) => {
      state.pharmacies = action.payload;
    },
    setCurrentPharmacy: (state, action: PayloadAction<Pharmacy>) => {
      state.currentPharmacy = action.payload;
    },
    setMedicines: (state, action: PayloadAction<Medicine[]>) => {
      state.medicines = action.payload;
    },
    addMedicine: (state, action: PayloadAction<Medicine>) => {
      state.medicines.push(action.payload);
    },
    updateMedicine: (state, action: PayloadAction<Medicine>) => {
      const index = state.medicines.findIndex(med => med.id === action.payload.id);
      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    },
    setSearchResults: (state, action: PayloadAction<Medicine[]>) => {
      state.searchResults = action.payload;
    },
  },
});

export const {
  setLoading,
  setPharmacies,
  setCurrentPharmacy,
  setMedicines,
  addMedicine,
  updateMedicine,
  setSearchResults,
} = pharmacySlice.actions;

export default pharmacySlice.reducer;