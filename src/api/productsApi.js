
  import axios from 'axios';

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api', // ajusta la URL según tu configuración
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default {
    // Método para obtener todos los productos
    getProducts(page) {
      return apiClient.get('/products?page=' + page);
    },
    // Método para obtener productos por categorías
    getProductsByCategory(id) {
      return apiClient.get('/category?id=' + id);
    },
    // Método para obtener productos por id
    getProductsById(id) {
      return apiClient.get('/id?id=' + id);
    },
    // Método para obtener productos por parámetro
    getProductsByParam(page, param) {
      return apiClient.get('/products?page=' + page + '&search=' + param);
    },
    // Método para obtener productos más vendidos
    getBestSeller() {
      return apiClient.get('/bestSeller');
    },
    // Método para obtener productos recientes
    getNewer() {
      return apiClient.get('/newer');
    },
    // Método para obtener productos random
    getPreview() {
      return apiClient.get('/preview');
    },
    // Método para obtener productos relacionados
    getRelated(id) {
      return apiClient.get('/related?id=' + id);
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