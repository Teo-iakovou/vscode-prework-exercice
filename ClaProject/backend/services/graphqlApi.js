import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const gqlApi = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    url: process.env.NEXT_PUBLIC_NESTJS_GRAPHQL_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllChallenges: builder.query({
      query: (category) => ({
        document: `
          query($category: String) {
            getAllChallenges(category: $category) {
              _id
              title
              category
              difficulty
              status
              solution_rate
            }
          }
        `,
        variables: { category },
      }),
    }),
    addChallenge: builder.mutation({
      query: (newChallenge) => ({
        document: `
          mutation($title: String!, $description: String!) {
            createChallenge(title: $title, description: $description) {
              _id
              title
              description
            }
          }
        `,
        variables: newChallenge,
      }),
    }),
  }),
});

export const { useGetAllChallengesQuery, useAddChallengeMutation } = gqlApi;
