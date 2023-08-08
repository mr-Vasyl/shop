import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_URL } from "utils/baseUrl";
import axios from "axios";

export const createUser = createAsyncThunk(
  "newUser/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${base_URL}/users`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser/updateUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.put(`${base_URL}/users/${body.id}`, body);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUsers = createAsyncThunk(
  "users/loginUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${base_URL}/auth/login`, body);
      const token = await axios.get(`${base_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      window.localStorage.setItem("accessToken", res.data.access_token);
      return token.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    cart: [],
    isError: "",
    isLoading: false,

    showForm: false,
  },

  reducers: {
    getCart: (state, { payload }) => {
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

    removeProductCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.product.id !== payload);
    },
    changeQuantityProduct: (state, { payload }) => {
      state.cart = state.cart.map((item) =>
        item.product.id === payload.product.id
          ? { ...item, quantity: payload.quantity }
          : item
      );
    },

    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    getLogOut: (state) => {
      state.currentUser = null;
      state.showForm = false;
      state.isError = "";
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      state.isLoading = true;
      state.isError = "";
    });
    builder.addCase(loginUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload;
    });
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
      state.currentUser = null;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = "";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isError = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;

      state.isError = action.payload.message;
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

      state.isError = action.payload.message;
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
export const usersSelector = (state) => state.users;
