import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "utils/baseUrl";
import axios from "axios";

export const postAddProduct = createAsyncThunk(
  "addProduct/postAddProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_URL}/products/`, body);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else if (error.request) {
        return rejectWithValue("Request failed, please try again later.");
      } else {
        return rejectWithValue("An error occurred, please try again later.");
      }
    }
  }
);

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    product: [],
    isError: false,
    isLoading: false,
    message: "",
  },

  extraReducers: (builder) => {
    builder.addCase(postAddProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postAddProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.product = payload;
    });
    builder.addCase(postAddProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message =
        action.payload || "An error occurred, please try again later.";
    });
  },
});

export default addProductSlice.reducer;
