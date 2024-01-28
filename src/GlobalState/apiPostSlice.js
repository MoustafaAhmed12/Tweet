import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Slice Api
export const apiPostSlice = createApi({
  // name of slice
  reducerPath: "posts",
  // Queries
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/api/" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getTimelinePosts: builder.query({
      query: ({ userId }) => `posts/timeline/${userId}`,
    }),
    getPosts: builder.query({
      query: () => `posts`,
      providesTags: ["Posts"],
    }),
    getPost: builder.query({
      query: (username) => `user?username=${username}`,
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: `post`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "DELETE",
        body: postId,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetTimelinePostsQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = apiPostSlice;
