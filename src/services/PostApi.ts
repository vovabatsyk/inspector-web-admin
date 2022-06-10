import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../models/IPost'
import { URL } from '../url'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts', 'Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL.DEFAULT}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getPosts: build.query<IPost[], number>({
      query: (limit = 50) => ({ url: 'posts' }),
      providesTags: ['Posts', 'Post'],
    }),
    addPost: build.mutation({
      query: (body: any) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    getPost: build.query<IPost, string>({
      query: (id) => `posts/${id}`,
      providesTags: ['Post'],
    }),
    // editNotice: build.mutation({
    //   query: ({ id, ...body }) => ({
    //     url: `notices/${id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['Notice'],
    // }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation, useDeletePostMutation } =
  postsApi
