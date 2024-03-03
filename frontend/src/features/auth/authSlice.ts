import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import axios from "axios";
import { RootState } from "../../app/store";

export interface authState {
  user: User | null;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: authState = {
  user: null,
  status: "idle",
};

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async () => {
    return new Promise<{ user: User }>((resolve, reject) => {
      axios
        .get("http://localhost:3010/api/user/profile", {
          withCredentials: true,
        })
        .then(async (resp) => {
          resolve({ user: resp.data.user });
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }
);

interface LoginData {
  userName: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: LoginData) => {
    return new Promise<{ user: User }>((resolve, reject) => {
      axios
        .post(
          "http://localhost:3010/api/auth/login",
          { userName: values.userName, password: values.password },
          {
            withCredentials: true,
          }
        )
        .then(async (resp) => {
          resolve(resp.data.user);
        })
        .catch((error: Error) => {
          console.error(error);
          reject(error);
        });
    });
  }
);

interface registerData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values: registerData) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(
          "http://localhost:3010/api/auth/register",
          {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        )
        .then(async (resp) => {
          resolve();
        })
        .catch((error: Error) => {
          console.error(error);
          reject(error);
        });
    });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectAuth = (state: RootState) => state.auth.user;
export default authSlice.reducer;
