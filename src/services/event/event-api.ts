import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "@/url/url";
import { EventResponse } from "../types/types";

export const eventsApi = createApi({
  reducerPath: "event",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const accessToken = localStorage?.getItem("access_token");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["event"],
  endpoints: (builder) => ({
    getevents: builder.query<EventResponse, any>({
      query: () => "/items/events",
      providesTags: ["event"],
    }),
    createevent: builder.mutation<any, any>({
      query: (eventData) => ({
        url: "/items/events",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["event"],
    }),
    updateevent: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/items/events/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["event"],
    }),
    deleteevent: builder.mutation<any, string>({
      query: (id) => ({
        url: `/items/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useGeteventsQuery,
  useCreateeventMutation,
  useUpdateeventMutation,
  useDeleteeventMutation,
} = eventsApi;
