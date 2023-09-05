import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_BASE_URL }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: ({ page, pageSize }) => `/posts?page=${page}&pageSize=${pageSize}`,
        }),
        getPostByTitle: builder.query({
            // Use a separate query function for getPostByTitle
            query: (title) => `/posts/title?postTitle=${title}`,
        }),
    }),
});

export const {
    useGetAllPostsQuery ,
    useGetPostByTitleQuery ,
} = apiSlice;