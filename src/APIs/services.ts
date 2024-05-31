import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://json-server-e8bi.onrender.com/";

export const zerakiApi = createApi({
  reducerPath: "zerakiApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: (name) => "schools?_embed=collections&_embed=invoices",
    }),
    getSchool: builder.query({
      query: (id) => `schools/${id}?_embed=collections&_embed=invoices`,
    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `collections/${id}`,
        method: "DELETE",
      }),
    }),
    updateCollection: builder.mutation({
      query: ({ id, body }) => ({
        url: `collections/${id}`,
        body,
        method: "PATCH",
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, body }) => ({
        url: `invoices/${id}`,
        body,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
  useUpdateInvoiceMutation,
} = zerakiApi;
