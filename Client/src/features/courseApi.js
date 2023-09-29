import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/courses",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ course, token }) => ({
        url: "/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: course,
      }),
    }),
    getCourseById: builder.query({
      query: (courseId) => `${courseId}`,
    }),
    getAllCourses: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetCourseByIdQuery, useGetAllCoursesQuery } = courseApi;
