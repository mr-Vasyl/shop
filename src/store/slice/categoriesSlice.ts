import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "config/baseUrl";
import axios from "axios";
import { setParams } from "utils/setParams";

import { RootState } from "store/index";

import {
  Categories,
  RelatedProducts,
  Products,
  CategoriesSchema,
} from "store/types/categories";

export const getCategories = createAsyncThunk<
  Categories[],
  undefined,
  { rejectValue: string }
>("categories/getCategories", async (_, thunkAPI) => {
  try {
    const products = await axios.get<Categories[]>(`${base_URL}/categories`);
    return products.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});

export const getRelatedProducts = createAsyncThunk<
  { isMount: boolean; data: Products[] },
  RelatedProducts,
  { rejectValue: string }
>(
  "categories/getRelatedProducts",
  async ({ isMount = false, ...params }, thunkAPI) => {
    try {
      const products = await axios.get<Products[]>(`${base_URL}/products`, {
        params: setParams(params),
      });
      return { isMount, data: products.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);

export const getSearchProducts = createAsyncThunk<
  Products[],
  string,
  { rejectValue: string }
>("search/getSearchProducts", async (search, thunkAPI) => {
  try {
    const products = await axios.get<Products[]>(
      `${base_URL}/products?title=${search}`
    );
    return products.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});

const initialState: CategoriesSchema = {
  list: [],
  related: [],
  search: [],
  error: "",
  errorSearch: "",
  isLoading: false,
  isLoadingSearch: false,
  isLoadingRelated: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoadingRelated = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoadingRelated = false;
      state.list = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoadingRelated = false;
      state.error = action.payload || "An error occurred";
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

      state.error = action.payload || "An error occurred";
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

      state.errorSearch = action.payload || "An error occurred";
      state.search = [];
    });
  },
});

export default categoriesSlice.reducer;
export const categoriesSelector = (state: RootState) => state.categories;
