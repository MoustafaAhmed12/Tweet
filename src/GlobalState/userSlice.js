import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../Utils/config";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const user = jwtDecode(localStorage.getItem("userToken"));
  try {
    const { data } = await axiosInstance.get(`/user?userId=${user._id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ userId, currentId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axiosInstance.put(`/user/${userId}/follow`, {
        userId: currentId,
      });
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async ({ userId, currentId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axiosInstance.put(`/user/${userId}/unfollow`, {
        userId: currentId,
      });
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isLoading: false,
    error: "",
    isFollow: false,
    followed: false,
  },
  reducers: {
    logOutFun: (state) => {
      state.currentUser = {};
    },
    handleFollowing: (state, { payload }) => {
      state.followed = state.currentUser.followings.includes(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(followUser.pending, (state) => {
        state.isFollow = true;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.isFollow = false;
        state.currentUser.followings = [
          ...state.currentUser.followings,
          payload,
        ];
      })
      .addCase(unfollowUser.pending, (state) => {
        state.isFollow = true;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.isFollow = false;
        state.currentUser.followings = state.currentUser.followings.filter(
          (f) => f !== payload
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logOutFun, handleFollowing } = userSlice.actions;
export default userSlice.reducer;
