import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../Utils/config";
import toast from "react-hot-toast";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ id, username }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = username
        ? await axiosInstance.get(`/posts/profile/${username}`)
        : await axiosInstance.get(`/posts/timeline/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await axiosInstance.delete(`/post/${postId}`);
      dispatch(getPosts());
      return postId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPosts = createAsyncThunk(
  "post/createPosts",
  async ({ postData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.post("/post", postData);
      toast.success("Created Post");
      if (data) {
        const updatePosts = { userId: postData.userId, postId: data._id };
        await axiosInstance.patch(
          `/user/${postData.userId}/posts`,
          updatePosts
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoading: false,
    error: "",
    isDeleted: false,
    isCreated: false,
  },
  extraReducers: (builder) => {
    builder
      //  get Posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })

      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete a  Post
      .addCase(deletePost.pending, (state) => {
        state.isDeleted = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.filter((post) => post.id !== payload);
        console.log(state.posts);
        state.isDeleted = false;
      })
      // Insert a new Post
      .addCase(createPosts.pending, (state) => {
        state.isCreated = true;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isCreated = false;
      });
  },
});

export default postSlice.reducer;
