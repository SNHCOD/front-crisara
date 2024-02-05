// cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      this.loadCart();
      const existingProduct = this.cart.find((item) => item.PRODUCTO === product.PRODUCTO);      
      if (existingProduct) {
        this.increaseQuantity(product.PRODUCTO, 1);
        return;
      }
      product.quantity = 1;
      this.cart.push(product);
      this.saveCart();
    },
    increaseQuantity(productId, amount) {
      this.loadCart();
      const existingProduct = this.cart.items.find((item) => item.idProduct === productId);

      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + amount;
        this.saveCart();
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((product) => product.PRODUCTO !== productId);
      this.saveCart();
    },
    replaceCart(cart) {
      this.cart = cart;
      this.saveCart();
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    loadCart() {
      const savedCart = localStorage.getItem('cart');
      this.cart = savedCart ? JSON.parse(savedCart) : [];
    },
    getCartProducts() {
      this.loadCart();
      return this.cart;
    },
  },
});
