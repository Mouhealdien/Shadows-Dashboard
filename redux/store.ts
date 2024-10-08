"use client";
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { Api } from "./services/Api";
import authReducer from "./features/authSlice";
import { createWrapper } from "next-redux-wrapper";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [Api.reducerPath]: Api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});
export type AppStore = ReturnType<any>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
