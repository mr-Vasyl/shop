import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "utils/baseUrl";
import axios from "axios";

export const getSearchProducts = createAsyncThunk(
  "search/getSearchProducts",
  async (search, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products/?title=${search}`);
      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getFilterByPriceRangeProducts = createAsyncThunk(
  "search/getFilterByPriceRangeProducts",
  async (body, thunkAPI) => {
    try {
      const products = await axios.get(
        `${base_URL}/products/?price_min=${body.min}&price_max=${body.max}`
      );
      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "search",
  initialState: {
    isError: false,
    isLoading: false,
    message: "",
    search: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getSearchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.search = payload;
    });
    builder.addCase(getSearchProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.search = [];
    });

    builder.addCase(getFilterByPriceRangeProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getFilterByPriceRangeProducts.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.search = payload;
      }
    );
    builder.addCase(getFilterByPriceRangeProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.search = [];
    });
  },
});

export default productsSlice.reducer;
