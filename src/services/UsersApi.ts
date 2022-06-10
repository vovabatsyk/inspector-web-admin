import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../models/IUser'
import { IUserData } from '../models/IUserData'
import { URL } from '../url'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'User'],
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
    getUsers: build.query<IUserData[], number>({
      query: (limit = 150) => ({ url: '/users' }),
      providesTags: ['Users', 'User'],
    }),
    addUser: build.mutation({
      query: (body: IUser) => ({
        url: 'auth/registration',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    getUser: build.query<IUserData, string>({
      query: (id) => `users/${id}`,
      providesTags: ['Users'],
    }),
    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = usersApi
