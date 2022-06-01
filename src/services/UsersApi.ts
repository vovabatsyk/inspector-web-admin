import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserData } from '../models/IUserData'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUserData[], number>({
      query: (limit = 150) => ({ url: 'users' }),
      providesTags: ['Users', 'User'],
    }),
    // addNotice: build.mutation({
    //   query: (body: INotice) => ({
    //     url: 'notices',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Notices'],
    // }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    // getContact: build.query<INotice, string>({
    //   query: (id) => `notices/${id}`,
    //   providesTags: ['Notice'],
    // }),
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

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi
