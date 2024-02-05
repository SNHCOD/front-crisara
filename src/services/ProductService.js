import api from "@/services/api";

export default {
    // Método para obtener todos los productos
    getProducts(page) {
      return api().get('/products?page=' + page);
    },
    // Método para obtener productos por categorías
    getProductsByCategory(id) {
      return api().get('/category?id=' + id);
    },
    // Método para obtener productos por id
    getProductsById(id) {
      return api().get('/id?id=' + id);
    },
    // Método para obtener productos por parámetro
    getProductsByParam(page, param) {
      return api().get('/products?page=' + page + '&search=' + param);
    },
    // Método para obtener productos más vendidos
    getBestSeller() {
      return api().get('/bestSeller');
    },
    // Método para obtener productos recientes
    getNewer() {
      return api().get('/newer');
    },
    // Método para obtener productos random
    getPreview() {
      return api().get('/preview');
    },
    // Método para obtener productos relacionados
    getRelated(id) {
      return api().get('/related?id=' + id);
    },
  };