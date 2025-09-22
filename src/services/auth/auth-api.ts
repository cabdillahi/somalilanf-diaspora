import { url } from "@/url/url";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../types/types";

export const authApi = createApi({
  reducerPath: "api",
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
  endpoints: (builder) => ({
    whoIam: builder.query<ApiResponse, void>({
      query: () => "/users/me",
    }),
    signIn: builder.mutation<ApiResponse, { email: string; password: string }>({
      query: (auth) => ({
        url: "/auth/login",
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useSignInMutation, useWhoIamQuery } = authApi;
