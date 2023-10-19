import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "config/baseUrl";
import axios from "axios";
import { setParams } from "utils/setParams";

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
export const getRelatedProducts = createAsyncThunk(
  "categories/getRelatedProducts",
  async ({ isMount = false, ...params }, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products`, {
        params: setParams(params),
      });
      return { isMount, data: products.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSearchProducts = createAsyncThunk(
  "search/getSearchProducts",
  async (search, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products?title=${search}`);
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
    related: [],
    search: [],
    error: "",
    isLoading: false,
    errorSearch: "",
    isLoadingSearch: false,
    isLoadingRelated: false,
  },
  reducers: {
    setRelated: (state, { payload }) => {
      state.related = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoadingRelated = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.isLoadingRelated = false;
      state.list = payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoadingRelated = false;
      state.error = action.payload.message;
      state.list = [];
    });

    builder.addCase(getRelatedProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload.isMount) {
        state.related = payload.data;
        return;
      }
      state.related = [...state.related, ...payload.data];
    });
    builder.addCase(getRelatedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.related = [];
    });

    builder.addCase(getSearchProducts.pending, (state) => {
      state.isLoadingSearch = true;
      state.errorSearch = "";
    });
    builder.addCase(getSearchProducts.fulfilled, (state, { payload }) => {
      state.isLoadingSearch = false;
      state.search = payload;
    });
    builder.addCase(getSearchProducts.rejected, (state, action) => {
      state.isLoadingSearch = false;
      state.errorSearch = action.payload.message;
      state.search = [];
    });
  },
});

export const { setRelated } = categoriesSlice.actions;
export default categoriesSlice.reducer;
export const categoriesSelector = (state) => state.categories;
