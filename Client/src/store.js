import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/courses/courseSlice";
import { userApi } from "./features/userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
