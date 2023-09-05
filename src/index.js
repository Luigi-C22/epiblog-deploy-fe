import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import { apiSlice } from "./api/apiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <ApiProvider api={apiSlice}>
              <App />
          </ApiProvider>
      </Provider>
  </React.StrictMode>
);