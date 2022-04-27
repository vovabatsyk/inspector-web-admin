import { INotice } from './../models/INotice'
import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const noticesApi = createApi({
    reducerPath: 'noticeApi',
    tagTypes: ['Notices', 'Notice'],
    baseQuery: fetchBaseQuery({
        baseUrl: ' https://parking-lviv-admin.herokuapp.com/'
    }),
    endpoints: build => ({
        getNotices: build.query<INotice[], number>({
            query: (limit = 5) => ({ url: 'notices' }),
            providesTags: ['Notices', 'Notice']
        }),
        addNotice: build.mutation({
            query: (body: INotice) => ({
                url: 'notices',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Notices']
        }),
        deleteNotice: build.mutation({
            query: (id: string) => ({
                url: `notices/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Notices']
        }),
    })
})

export const { useGetNoticesQuery, useAddNoticeMutation, useDeleteNoticeMutation } = noticesApi