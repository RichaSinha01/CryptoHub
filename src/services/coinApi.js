import { createApi, fetchBaseQuery }  from '@reduxjs/toolkit/query/react';

const coinApiHeaders = {
    'X-RapidAPI-Key': 'c7291469a8msh0140b68ed629e0ap165cb2jsn0aec64bfcba7',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: coinApiHeaders });

export const coinApi  = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
        }),
        /*getExchanges: builder.query({
            query: (timePeriod) => createRequest('/coin/Qwsogvtv82FCd/exchanges'),
        })*/
    })
});

export const { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = coinApi;