import { INotice } from './../models/INotice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const noticesApi = createApi({
  reducerPath: 'noticeApi',
  tagTypes: ['Notices', 'Notice'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    // baseUrl: 'http://localhost:3000/'
  }),
  endpoints: (build) => ({
    getNotices: build.query<INotice[], number>({
      query: (limit = 5) => ({ url: 'notices' }),
      providesTags: ['Notices', 'Notice'],
    }),
    addNotice: build.mutation({
      query: (body: INotice) => ({
        url: 'notices',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notices'],
    }),
    deleteNotice: build.mutation({
      query: (id) => ({
        url: `notices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notices'],
    }),
    getContact: build.query<INotice, string>({
      query: (id) => `notices/${id}`,
      providesTags: ['Notice'],
    }),
    editNotice: build.mutation({
      query: ({ id, ...body }) => ({
        url: `notices/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Notice'],
    }),
  }),
})

export const {
  useGetNoticesQuery,
  useAddNoticeMutation,
  useDeleteNoticeMutation,
  useGetContactQuery,
  useEditNoticeMutation,
} = noticesApi
