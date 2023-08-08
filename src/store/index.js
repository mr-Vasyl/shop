import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./productsSlice/productsSlice";
import categoriesSlice from "./categoriesSlice/categoriesSlice";
import productSlice from "./productSlice/productSlice";
import searchSlice from "./searchSlice/searchSlice";
import addProductSlice from "./addProductSlice/addProductSlice";
import userSlice from "./userSlice/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesSlice,
    product: productSlice,
    search: searchSlice,
    addProduct: addProductSlice,
    users: userSlice,
  },
});
