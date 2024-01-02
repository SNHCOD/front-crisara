// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import About from '@/pages/about/About.vue';
import Auth from '@/pages/auth/Auth.vue';
import Cart from '@/pages/cart/Cart.vue';
import Category from '@/pages/category/Category.vue';
import Contact from '@/pages/contact/Contact.vue';
import Checkout from '@/pages/checkout/Checkout.vue';
import Deliver from '@/pages/deliver/Deliver.vue';
import Home from '@/pages/index/Home.vue';
import Product from '@/pages/product/Product.vue';
import Products from '@/pages/products/Products.vue';
import Profile from '@/pages/profile/Profile.vue';
import Promotions from '@/pages/promotions/Promotions.vue';
import Search from '@/pages/search/Search.vue';

const routes = [
  {
    path: '/about',
    component: About,
    name: 'About',
  },
  {
    path: '/auth',
    component: Auth,
    name: 'Auth',
  },
  {
    path: '/cart',
    component: Cart,
    name: 'Cart',
  },
  {
    path: '/category',
    component: Category,
    name: 'Category',
  },
  {
    path: '/contact',
    component: Contact,
    name: 'Contact',
  },
  {
    path: '/checkout',
    component: Checkout,
    name: 'Checkout',
  },
  {
    path: '/deliver',
    component: Deliver,
    name: 'Deliver',
  },
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/products',
    component: Products,
    name: 'Products',
  },
  {
    path: '/product',
    component: Product,
    name: 'Product',
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
  },
  {
    path: '/promotions',
    component: Promotions,
    name: 'Promotions',
  },
  {
    path: '/search',
    component: Search,
    name: 'Search',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
