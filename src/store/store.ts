import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notesApi } from "./../api/notesApi";

const rootReducer = combineReducers({
  [notesApi.reducerPath]: notesApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(notesApi.middleware),
  });
};

export type rootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
