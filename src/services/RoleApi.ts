import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRole } from '../models/IRole'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  tagTypes: ['Roles', 'Role'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getRoles: build.query<IRole[], number>({
      query: (limit = 150) => ({ url: '/roles' }),
      providesTags: ['Roles', 'Role'],
    }),
    addRole: build.mutation({
      query: (body) => ({
        url: 'users/role',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Roles'],
    }),
    // deleteUser: build.mutation({
    //   query: (id) => ({
    //     url: `api/users/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Users'],
    // }),
    // getUser: build.query<IUserData, string>({
    //   query: (id) => `api/users/${id}`,
    //   providesTags: ['Users'],
    // }),
    // updateUser: build.mutation({
    //   query: ({ id, ...body }) => ({
    //     url: `api/users/${id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
  }),
})

export const { useGetRolesQuery, useAddRoleMutation } = rolesApi
