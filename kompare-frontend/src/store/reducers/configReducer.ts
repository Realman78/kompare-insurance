import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoverages, fetchDiscounts } from '../../services/api';
import { Coverage, Discount } from '../../types/types';

interface ConfigState {
  coverages: Coverage[];
  discounts: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: ConfigState = {
  coverages: [],
  discounts: [],
  loading: false,
  error: null,
};

export const getCoverages = createAsyncThunk(
  'coverage/getCoverages',
  async () => {
    const response = await fetchCoverages();
    console.log(response.result);
    return response.result;
  }
);
export const getDiscounts = createAsyncThunk(
  'coverage/getDiscounts',
  async () => {
    const response = await fetchDiscounts();
    return response.result;
  }
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoverages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoverages.fulfilled, (state, action) => {
        state.loading = false;
        state.coverages = action.payload;
      })
      .addCase(getCoverages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load coverages';
      })
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load discounts';
      });
  },
});

export default configSlice.reducer;
