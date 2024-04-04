import { createApi, fetchBaseQuery }  from '@reduxjs/toolkit/query/react';

const exchangeApiHeaders = {
    'X-RapidAPI-Key': 'c7291469a8msh0140b68ed629e0ap165cb2jsn0aec64bfcba7',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: exchangeApiHeaders });

export const exchangeApi  = createApi({
    reducerPath: 'exchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: (count) => createRequest('/exchanges'),
        }),
        /*getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        })*/
    })
});

export const { useGetExchangesQuery } = exchangeApi;