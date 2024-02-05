
  import axios from 'axios';

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api', // ajusta la URL según tu configuración
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default {
    // Método para obtener todos los productos
    pay(params) {
      return apiClient.post('/conekta/pay', params);
    },
  };
/*
// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }), // Ajusta según la ruta de tu API
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => `products?page=${page}`,
    }),
    getProductsByCategory: builder.query({
      query: (id) => `category?id=${id}`,
    }),
    getProductsByParam: builder.query({
      query: ({ page, param }) => `products?page=${page}&search=${param}`,
    }),
    getBestSeller: builder.query({
      query: () => 'bestSeller',
    }),
    getNewer: builder.query({
      query: () => 'newer',
    }),
    getPreview: builder.query({
      query: () => 'preview',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByParamQuery,
  useGetBestSellerQuery,
  useGetNewerQuery,
  useGetPreviewQuery,
} = productApi;
*/