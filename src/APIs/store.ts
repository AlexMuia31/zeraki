import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { zerakiApi } from "./services";

export const store = configureStore({
  reducer: {
    [zerakiApi.reducerPath]: zerakiApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(zerakiApi.middleware),
});

setupListeners(store.dispatch);
