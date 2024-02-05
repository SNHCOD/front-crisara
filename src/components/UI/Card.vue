<script setup>
// Importar funcionalidades | utilidades
import { defineProps } from 'vue';

// Importar componentes
import AddToCart from '@/components/UI/AddToCart.vue';

// Definición de datos
const { product } = defineProps(['product']);

// Definición ciclo de vida
</script>

<template>
    <div class="border-2 border-gray-200 rounded-lg">
            <a :href="'/product?id=' + product.PRODUCTO" class="group relative block overflow-hidden">
                <!--button
                    class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                    <span class="sr-only">Wishlist</span>

                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                    </svg>
                </!--button-->
                <img
                    :src="'https://picsum.photos/300?random=' + product.PRODUCTO"
                    alt=""
                    class="h-64 w-5/6 mx-auto object-contain transition duration-500 group-hover:scale-105 sm:h-72 mt-5"/>
                <div class="relative bg-white p-6 overflow-hidden">
                    <span class="whitespace-nowrap text-pink-500 bg-gray-100 px-3 py-1.5 text-sm font-medium"> {{ product.category }} </span>
                    <p class="whitespace-nowrap px-3 py-1.5 text-xs font-medium"> {{ product.unity }} </p>
                    <h3 class="mt-4 text-lg font-medium text-gray-900 line-clamp-2 min-h-[3.5rem]" :title="product.Descripcion">{{ product.PRODUCTO + ' | ' + product.Descripcion }}</h3>
                    <span class="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ '$ ' + product.PrecioWeb }}</span>

                </div>
            </a>
            <div class="w-5/6 mx-auto mt-0 mb-5">
                <AddToCart :product="product" quantity="1" />
            </div>
        </div>
</template>