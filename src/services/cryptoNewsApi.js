import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'c7291469a8msh0140b68ed629e0ap165cb2jsn0aec64bfcba7',
    'X-RapidAPI-Host': 'crypto-news51.p.rapidapi.com'
}

const baseUrl = 'https://crypto-news51.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi  = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ count }) => createRequest(`/api/v1/crypto/articles`),
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;