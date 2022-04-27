import { IPayment } from './../models/IPayment'
import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    tagTypes: ['Payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/'
    }),
    endpoints: build => ({
        getPayment: build.query<IPayment, number>({
            query: (limit = 1) => ({ url: 'payment-details' }),
            providesTags: ['Payment']
        }),
        editPayment: build.mutation({
            query: (body) => ({
                url: `payment-details`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Payment']
        }),
    })
})

export const { useGetPaymentQuery, useEditPaymentMutation } = paymentApi