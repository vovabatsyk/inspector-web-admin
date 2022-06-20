import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../url'
import { IViolAdmin } from '../models/IViolAdmins'

export const violAdminsApi = createApi({
  reducerPath: 'violAdminsApi',
  tagTypes: ['ViolAdmins', 'violAdmin'],
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
    getAll: build.query<IViolAdmin[], number>({
      query: (limit = 5) => ({ url: 'violation-admin' }),
      providesTags: ['ViolAdmins', 'violAdmin'],
    }),
    add: build.mutation({
      query: (body: IViolAdmin) => ({
        url: 'violation-admin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ViolAdmins'],
    }),
    delete: build.mutation({
      query: (id) => ({
        url: `violation-admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ViolAdmins'],
    }),
    getById: build.query<IViolAdmin, string>({
      query: (id) => `violation-admin/${id}`,
      providesTags: ['violAdmin'],
    }),
    edit: build.mutation({
      query: ({ id, ...body }) => ({
        url: `violation-admin/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['violAdmin'],
    }),
  }),
})

export const {
  useDeleteMutation,
  useEditMutation,
  useGetAllQuery,
  useGetByIdQuery,
  useAddMutation,
} = violAdminsApi
