import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slice/productsSlice";
import categoriesSlice from "./slice/categoriesSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesSlice,
    users: userSlice,
  },
});
