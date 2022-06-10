import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../url'
import { IStory } from '../models/IStory'

export const storiesApi = createApi({
  reducerPath: 'storiesApi',
  tagTypes: ['Stories', 'Story'],
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
    getStories: build.query<IStory[], number>({
      query: (limit = 5) => ({ url: 'violation-story' }),
      providesTags: ['Stories', 'Story'],
    }),
    addStory: build.mutation({
      query: (body: IStory) => ({
        url: 'violation-story',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Stories'],
    }),
    deleteStory: build.mutation({
      query: (id) => ({
        url: `violation-story/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stories'],
    }),
    getStory: build.query<IStory, string>({
      query: (id) => `violation-story/${id}`,
      providesTags: ['Story'],
    }),
    editStory: build.mutation({
      query: ({ id, ...body }) => ({
        url: `violation-story/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Story'],
    }),
  }),
})

export const {
  useAddStoryMutation,
  useDeleteStoryMutation,
  useEditStoryMutation,
  useGetStoriesQuery,
  useGetStoryQuery,
} = storiesApi
