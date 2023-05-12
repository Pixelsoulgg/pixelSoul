import {
  AnyAction,
  configureStore,
  Store,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from '@reduxjs/toolkit/query'


import { rootReducer } from "./rootReducer";
import { api } from "@/services/api";

// logger,
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

const store: AppStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([api.middleware]),
});


setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
