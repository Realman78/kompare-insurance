import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { calculateInsurance } from '../../services/api';
import { Additional } from '../../types/types';
import { GetCoveragesRequestBody } from '../../interfaces/calculation';

interface PriceState {
  priceDetails: {
    basePrice: number,
    coverageTotal: number,
    discountTotal: number,
    totalPrice: number,
    discounts: Additional[],
    coverages: Additional[]
  };
  loading: boolean;
  error: string | null;
}

const initialState: PriceState = {
  priceDetails: {
    basePrice: 0,
    coverageTotal: 0,
    discountTotal: 0,
    totalPrice: 0,
    discounts: [],
    coverages: [],
  },
  loading: false,
  error: null,
};

export const calculatePrice = createAsyncThunk(
  'price/calculatePrice',
  async (data: GetCoveragesRequestBody) => {
    const response = await calculateInsurance(data);
    console.log("marin");
    console.log(response);
    return response;
  }
);

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    resetPriceDetails: (state) => {
      state.priceDetails = initialState.priceDetails
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculatePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculatePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.priceDetails = action.payload;
      })
      .addCase(calculatePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to calculate price';
      });
  },
});

export const { resetPriceDetails } = priceSlice.actions;

export default priceSlice.reducer;
