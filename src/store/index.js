import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./productsSlice";
import categoriesSlice from "./categoriesSlice";
import productSlice from "./productSlice";
import searchSlice from "./searchSlice";
import addProductSlice from "./addProductSlice";
import userSlice from "./userSlice";

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
