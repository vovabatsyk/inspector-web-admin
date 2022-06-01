import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../models/IUser'
import { IUserData } from '../models/IUserData'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
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
      query: (limit = 150) => ({ url: 'api/users' }),
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
        url: `api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    getUser: build.query<IUserData, string>({
      query: (id) => `api/users/${id}`,
      providesTags: ['Users'],
    }),
    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `api/users/${id}`,
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
