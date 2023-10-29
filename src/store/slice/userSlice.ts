import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { base_URL } from "config/baseUrl";
import axios from "axios";
import { RootState } from "store/index";

import {
  User,
  UserSchema,
  Cart,
  AccessToken,
  RefreshResponse,
  ErrorResponse,
} from "types/user";
import { Products } from "types/categories";

export const createUser = createAsyncThunk<
  User,
  User,
  { rejectValue: ErrorResponse }
>("newUser/createUser", async (user, thunkAPI) => {
  try {
    const res = await axios.post<User>(`${base_URL}/users`, user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "An error occurred" });
  }
});

export const updateUser = createAsyncThunk<
  User,
  User,
  { rejectValue: ErrorResponse }
>("updateUser/updateUser", async (body, thunkAPI) => {
  try {
    const res = await axios.put<User>(`${base_URL}/users/${body.id}`, body);

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "An error occurred" });
  }
});

const refreshAccessToken = async (): Promise<AccessToken> => {
  try {
    const refreshToken = window.localStorage.getItem("refresh_token");
    const response = await axios.post<RefreshResponse>(
      `${base_URL}/auth/refresh-token`,
      {
        refreshToken,
      }
    );
    const newAccessToken = response.data.access_token;
    window.localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export const loginUsers = createAsyncThunk<
  User,
  User,
  { rejectValue: ErrorResponse }
>("users/loginUser", async (body, thunkAPI) => {
  try {
    let accessToken: AccessToken | null =
      window.localStorage.getItem("accessToken");

    if (!accessToken) {
      const res = await axios.post<{ access_token: AccessToken }>(
        `${base_URL}/auth/login`,
        body
      );
      accessToken = res.data.access_token;
      window.localStorage.setItem("accessToken", accessToken);
    }

    const token = await axios.get<User>(`${base_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return token.data;
  } catch (error) {
    try {
      const newAccessToken = await refreshAccessToken();
      const token = await axios.get<User>(`${base_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      return token.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: "An error occurred" });
    }
  }
});

const initialState: UserSchema = {
  currentUser: null,
  cart: [],
  error: "",
  isLoading: false,
  showForm: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getCart: (state, { payload }: PayloadAction<Products>) => {
      const newCart = state.cart.map((item) => ({ ...item }));
      const existingItem = newCart.find(
        (item) => item.product.id === payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newCart.push({ product: payload, quantity: 1 });
      }
      return { ...state, cart: newCart };
    },

    removeProductCart: (state, { payload }: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.product.id !== payload);
    },

    changeQuantityProduct: (state, { payload }: PayloadAction<Cart>) => {
      state.cart = state.cart.map((item) =>
        item.product.id === payload.product.id
          ? { ...item, quantity: payload.quantity }
          : item
      );
    },

    toggleForm: (state, { payload }: PayloadAction<boolean>) => {
      state.showForm = payload;
    },

    getLogOut: (state) => {
      state.currentUser = null;
      state.showForm = false;
      state.error = "";
      state.isLoading = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload;
    });
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
      state.currentUser = null;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.payload?.message;
      state.currentUser = null;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
      state.currentUser = null;
    });
  },
});

export const {
  toggleForm,
  getLogOut,
  getCart,
  removeProductCart,
  changeQuantityProduct,
} = userSlice.actions;
export default userSlice.reducer;
export const usersSelector = (state: RootState) => state.users;
