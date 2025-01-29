import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import { gqlApi } from "./services/graphqlApi"; // Import the GraphQL API

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [gqlApi.reducerPath]: gqlApi.reducer, // Add GraphQL API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gqlApi.middleware), // Include GraphQL API middleware
});

export default store;
