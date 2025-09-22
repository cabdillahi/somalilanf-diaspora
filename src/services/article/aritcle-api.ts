import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleResponse } from "../types/types";
import { url } from "@/url/url";

export const articlesApi = createApi({
  reducerPath: "article",
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
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleResponse, any>({
      query: () => "/items/articles",
      providesTags: ["Article"],
    }),
    createArticle: builder.mutation<any, any>({
      query: (articleData) => ({
        url: "/items/articles",
        method: "POST",
        body: articleData,
      }),
      invalidatesTags: ["Article"],
    }),
    updateArticle: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/items/articles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation<any, string>({
      query: (id) => ({
        url: `/items/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi;
