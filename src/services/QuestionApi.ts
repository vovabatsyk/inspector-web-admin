import { IQuestion } from './../models/IQuetion'
import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const questionApi = createApi({
    reducerPath: 'questionApi',
    tagTypes: ['Questions', 'Question'],
    baseQuery: fetchBaseQuery({
        baseUrl: ' https://parking-lviv-admin.herokuapp.com/'
    }),
    endpoints: build => ({
        getQuestions: build.query<IQuestion[], number>({
            query: (limit = 5) => ({ url: 'questions' }),
            providesTags: ['Questions', 'Question']
        }),
        addQuestion: build.mutation({
            query: (body: IQuestion) => ({
                url: 'questions',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Questions']
        }),
        deleteQuestion: build.mutation({
            query: (id: string) => ({
                url: `questions/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Questions']
        }),
    })
})

export const { useAddQuestionMutation, useDeleteQuestionMutation, useGetQuestionsQuery } = questionApi