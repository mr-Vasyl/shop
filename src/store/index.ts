import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";
import categoriesSlice from "./slice/categoriesSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: categoriesSlice,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
