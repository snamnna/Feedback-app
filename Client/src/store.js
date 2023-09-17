import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/courses/courseSlice";
import { userApi } from "./features/userApi";
import { courseApi } from "./features/courseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(courseApi.middleware),
});

setupListeners(store.dispatch);
