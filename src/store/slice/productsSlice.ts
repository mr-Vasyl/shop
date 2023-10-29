import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "config/baseUrl";
import axios from "axios";
import { setParams } from "utils/setParams";

import { RootState } from "store/index";

import { RelatedProducts, Products } from "types/categories";
import { FilteredProducts, NewProduct, productsSchema } from "types/products";

import { ErrorResponse } from "types/user";

export const getProducts = createAsyncThunk<
  { isMount: boolean; data: Products[] },
  RelatedProducts,
  { rejectValue: ErrorResponse }
>("products/getProducts", async ({ isMount = false, ...params }, thunkAPI) => {
  try {
    const products = await axios.get<Products[]>(`${base_URL}/products`, {
      params: setParams(params),
    });
    return { isMount, data: products.data };
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "An error occurred" });
  }
});

export const getFilteredProducts = createAsyncThunk<
  Products[],
  FilteredProducts,
  { rejectValue: ErrorResponse }
>("products/getFilteredProducts", async (params, thunkAPI) => {
  try {
    const products = await axios.get<Products[]>(`${base_URL}/products`, {
      params: setParams(params),
    });

    return products.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "An error occurred" });
  }
});

export const postAddProduct = createAsyncThunk<
  Products,
  NewProduct,
  { rejectValue: ErrorResponse }
>("products/postAddProduct", async (body, thunkAPI) => {
  try {
    const response = await axios.post<Products>(`${base_URL}/products/`, body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "An error occurred" });
  }
});

export const getProduct = createAsyncThunk<
  Products,
  string,
  { rejectValue: ErrorResponse }
>("products/getProduct", async (id, thunkAPI) => {
  try {
    const products = await axios.get<Products>(`${base_URL}/products/${id}`);
    return products.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "An error occurred" });
  }
});

const initialState: productsSchema = {
  list: [],
  product: null,
  filteredList: [],
  oneProduct: null,
  error: "",
  isLoading: false,
  errorFilter: "",
  isLoadingFilter: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
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
      state.error = action.payload?.message;
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
      state.errorFilter = action.payload?.message;
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
      state.error = action.payload?.message;
      state.product = null;
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
      state.error = action.payload?.message;
      state.isLoading = false;
      state.oneProduct = null;
    });
  },
});
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
export const productsSelector = (state: RootState) => state.products;
