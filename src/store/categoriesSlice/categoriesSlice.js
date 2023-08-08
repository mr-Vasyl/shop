import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "utils/baseUrl";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/categories`);
      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isError: "",
    isLoading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
      state.list = [];
    });
  },
});

export default categoriesSlice.reducer;
export const categoriesSelector = (state) => state.categories;
