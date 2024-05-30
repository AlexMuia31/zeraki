import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/";

export const zerakiApi = createApi({
  reducerPath: "zerakiApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: (name) => "schools",
    }),
    getSchool: builder.query({
      query: (id) => `schools/${id}`,
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `schools/${id}`,
        method: "DELETE",
      }),
    }),
    updateSchool: builder.mutation({
      query: (id) => ({
        url: `schools/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useDeleteSchoolMutation,
} = zerakiApi;
