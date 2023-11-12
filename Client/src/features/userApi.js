import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserCourses: builder.query({
      query: (id) => `/users/${id}/courses`,
    }),
    getUserByUsername: builder.query({
      query: (username) => `/users/name/${username}`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetUserCoursesQuery,
  useGetUserByUsernameQuery,
} = userApi;
