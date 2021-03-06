import { INotice } from './../models/INotice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../url'

export const noticesApi = createApi({
  reducerPath: 'noticeApi',
  tagTypes: ['Notices', 'Notice'],
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
