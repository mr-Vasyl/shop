import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "utils/baseUrl";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products/${id}`);
      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    oneProduct: null,
    isError: "",
    isLoading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.oneProduct = payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isError = action.payload.message;
      state.isLoading = false;
      state.oneProduct = null;
    });
  },
});

export default productSlice.reducer;
export const productSelector = (state) => state.product;
