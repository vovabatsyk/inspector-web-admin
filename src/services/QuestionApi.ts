import { IQuestion } from './../models/IQuetion'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const questionApi = createApi({
  reducerPath: 'questionApi',
  tagTypes: ['Questions', 'Question'],
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
    getQuestions: build.query<IQuestion[], number>({
      query: (limit = 5) => ({ url: 'questions' }),
      providesTags: ['Questions', 'Question'],
    }),
    addQuestion: build.mutation({
      query: (body: IQuestion) => ({
        url: 'questions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Questions'],
    }),
    deleteQuestion: build.mutation({
      query: (id: string) => ({
        url: `questions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Questions'],
    }),
    getQuestion: build.query<IQuestion, string>({
      query: (id) => `questions/${id}`,
      providesTags: ['Question'],
    }),
    editQuestion: build.mutation({
      query: ({ id, ...body }) => ({
        url: `questions/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
  }),
})

export const {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useEditQuestionMutation,
  useGetQuestionQuery,
} = questionApi
