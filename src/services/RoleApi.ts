import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRole } from '../models/IRole'
import { URL } from '../url'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  tagTypes: ['Roles', 'Role'],
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
  }),
})

export const { useGetRolesQuery, useAddRoleMutation } = rolesApi
