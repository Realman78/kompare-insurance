import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: number;
  voucher?: number;
  selectedCoverages: string[];
  selectedDiscounts: string[];
}

const initialState: FormState = {
  name: '',
  birthdate: '',
  city: '',
  vehiclePower: 0,
  voucher: 0,
  selectedCoverages: [],
  selectedDiscounts: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    toggleCoverage: (state, action: PayloadAction<string>) => {
      const index = state.selectedCoverages.indexOf(action.payload);
      if (index >= 0) {
        state.selectedCoverages.splice(index, 1);
      } else {
        state.selectedCoverages.push(action.payload);
      }
    },
    toggleDiscount: (state, action: PayloadAction<string>) => {
      const index = state.selectedDiscounts.indexOf(action.payload);
      if (index >= 0) {
        state.selectedDiscounts.splice(index, 1);
      } else {
        state.selectedDiscounts.push(action.payload);
      }
    },
    cleanCoverageAndDiscounts: (state) => {
      state.selectedCoverages = []
      state.selectedDiscounts = []
    },
  },
});

export const { setFormData, toggleCoverage, toggleDiscount, cleanCoverageAndDiscounts } = formSlice.actions;
export default formSlice.reducer;
