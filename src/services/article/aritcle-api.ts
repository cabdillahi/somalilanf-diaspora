import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleResponse, Article } from "../types/types"; // hubi inaad haysato `Article` interface
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
    // ✅ getArticles
    getArticles: builder.query<ArticleResponse, void>({
      query: () => "/items/articles",
      providesTags: ["Article"],
    }),

    // ✅ createArticle
    createArticle: builder.mutation<Article, Partial<Article>>({
      query: (articleData) => ({
        url: "/items/articles",
        method: "POST",
        body: articleData,
      }),
      invalidatesTags: ["Article"],
    }),

    // ✅ updateArticle
    updateArticle: builder.mutation<Article, { id: string; data: Partial<Article> }>({
      query: ({ id, data }) => ({
        url: `/items/articles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),

    // ✅ deleteArticle
    deleteArticle: builder.mutation<{ success: boolean; id: string }, string>({
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
