import { configureStore, Middleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "./index";
import { watcherSaga } from "./sagas/rootsaga";

const customMiddleware: Middleware = () => (next) => (action) => next(action);

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(customMiddleware, sagaMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(watcherSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
