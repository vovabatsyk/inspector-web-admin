import { IPayment } from './../models/IPayment'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../url'

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  tagTypes: ['Payment'],
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
    getPayment: build.query<IPayment, number>({
      query: (limit = 1) => ({ url: 'payment/1' }),
      providesTags: ['Payment'],
    }),
    editPayment: build.mutation({
      query: (body) => ({
        url: `payment/1`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
})

export const { useGetPaymentQuery, useEditPaymentMutation } = paymentApi
