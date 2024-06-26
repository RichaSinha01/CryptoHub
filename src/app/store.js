import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { coinApi } from "../services/coinApi";
import { exchangeApi } from "../services/exchangeApi";


export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [coinApi.reducerPath]: coinApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware, coinApi.middleware, exchangeApi.middleware)
});
