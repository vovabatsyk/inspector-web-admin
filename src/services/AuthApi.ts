import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../url'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL.DEFAULT}/api/`,
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: 'auth/login',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi
