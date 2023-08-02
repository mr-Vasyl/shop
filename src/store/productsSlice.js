import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "../utils/baseUrl";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products`);
      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRelatedProducts = createAsyncThunk(
  "products/getRelatedProducts",
  async (categoryId, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products`);
      return products.data.filter(
        (product) => product.category.id === Number(categoryId)
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    isError: false,
    isLoading: false,
    message: "",
    related: [],
    search: [],
  },
  reducers: {
    setProductRange: (state, { payload }) => {
      state.list = payload.map((item) => item);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.list = [];
    });

    builder.addCase(getRelatedProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.related = payload;
    });
    builder.addCase(getRelatedProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.related = [];
    });
  },
});
export const { setProductRange } = productsSlice.actions;
export default productsSlice.reducer;
