import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notesApi } from "./../api/notesApi";
import { tagsApi } from './../api/tagsApi';

const rootReducer = combineReducers({
  [notesApi.reducerPath]: notesApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(notesApi.middleware).concat(tagsApi.middleware),
  });
};

export type rootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
