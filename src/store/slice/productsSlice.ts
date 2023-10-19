import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "config/baseUrl";
import axios from "axios";
import { setParams } from "utils/setParams";

export const getProducts = createAsyncThunk(
  "products/getProducts",
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
export const getFilteredProducts = createAsyncThunk(
  "products/getFilteredProducts",
  async (params = {}, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products`, {
        params: setParams(params),
      });

      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const postAddProduct = createAsyncThunk(
  "products/postAddProduct",
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
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      const products = await axios.get(`${base_URL}/products/${id}`);
      return products.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    product: [],
    filteredList: [],
    oneProduct: null,
    error: "",
    isLoading: false,
    errorFilter: "",
    isLoadingFilter: false,
  },

  reducers: {
    setProducts: (state, { payload }) => {
      state.list = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload.isMount) {
        state.list = payload.data;
        return;
      }

      state.list = [...state.list, ...payload.data];
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.list = [];
    });

    builder.addCase(getFilteredProducts.pending, (state) => {
      state.isLoadingFilter = true;
    });
    builder.addCase(getFilteredProducts.fulfilled, (state, { payload }) => {
      state.isLoadingFilter = false;
      state.filteredList = payload;
    });
    builder.addCase(getFilteredProducts.rejected, (state, action) => {
      state.isLoadingFilter = false;
      state.errorFilter = action.payload.message;
      state.filteredList = [];
    });

    builder.addCase(postAddProduct.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(postAddProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
    });
    builder.addCase(postAddProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.product = [];
    });

    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.oneProduct = payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
      state.oneProduct = null;
    });
  },
});
export const { clearProducts, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
export const productsSelector = (state) => state.products;
