import api from "@/services/api";

export default {
  register(params) {
    return api().post('/customer', params);
  },
  login(params) {
    return api().post('/login', params);
  },
  update(params) {
    return api().put('/customer', params);
  },
  getShoppingCart(id) {
    return api().get('/sp?id=' + id);
  },
  updateShoppingCartItems(params) {
    return api().put('/sp', params);
  },
  destroyShoppingCartItem(params) {
    return api().delete('/sp', { data: params });
  },
  applyCuppon(cuppon, id) {
    return api().get('/cuppon?Codigo=' + cuppon + '&id=' + id);
  },
  forgotPassword(params) {
    return api().post('/forgotPassword', params);
  },
  resetPassword(params) {
    return api().post('/resetPassword', params);
  },
  contact(params) {
    return api().post('/contact', params);
  },
};