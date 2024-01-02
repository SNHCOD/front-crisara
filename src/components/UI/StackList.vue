<script setup>
// Importar funcionalidades | utilidades
import { ref } from 'vue'

// Importar componentes
import AddToCart from '@/components/UI/AddToCart.vue';

// Definición de datos
const props = defineProps(['items']);
</script>

<template>
    <div class="grid grid-flow-row auto-rows-max gap-2" >
        <div v-for="(item, index) in items" class="grid grid-cols-3 w-full text-sm font-medium text-gray-900 bg-white border border-black/40 rounded-lg border-gray-200">
            <div class="col-span-2">
                <a href="#" class="flex flex-col items-center bg-white rounded-sm  md:flex-row  hover:bg-gray-100 ">
                    <img class="object-cover w-full rounded-t-lg min-w-[12.5rem] max-h-40 md:h-auto md:w-48 md:rounded-none md:rounded-s-sm" src="https://picsum.photos/200/300" alt="">
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <span class="whitespace-nowrap text-pink-500 px-3 py-1.5 text-sm font-medium"> {{ item.category }} </span>
                        <p class="whitespace-nowrap px-3 py-1.5 text-xs font-medium"> {{ item.unity }} </p>
                        <h3 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 truncate" :title="item.Descripcion">{{ item.PRODUCTO + ' | ' + item.Descripcion }}</h3>
                        <p class="mt-1.5 text-sm text-gray-700">{{ '$ ' + item.PrecioWeb }}</p>

                    </div>
                </a>
            </div>
            <div class="self-center place-self-end mr-5">
                <AddToCart :product="item" />
            </div>
        </div>
    </div>
</template>