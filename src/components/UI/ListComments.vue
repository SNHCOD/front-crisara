<script setup>
// Importar funcionalidades | utilidades
import { ref } from 'vue';
import Rating from '@/components/UI/Rating.vue';

// Importar componentes

// Definición de datos

// Definición de métodos
</script>

<template>
    <ul role="list" class="w-full border p-5 divide-y divide-gray-200">
        <li class="py-3 min-h-[6rem]">
            <div class="flex flex-row items-center">
                <div class="flex-shrink-0">
                    <img class="w-16 h-16 rounded-full" src="https://picsum.photos/70?random=1" alt="Neil image">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                        Neil Sims
                    </p>
                    <Rating />
                </div>
                <div class="inline-flex items-center text-base text-gray-900 line-clamp-3 max-w-[40rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque vel perspiciatis fugiat est rei aks
                    asad oopdkl podod
                </div>
            </div>
        </li>
        <li class="py-3 min-h-[6rem]">
            <div class="flex items-center ">
                <div class="flex-shrink-0">
                    <img class="w-16 h-16 rounded-full" src="https://picsum.photos/70?random=2" alt="Bonnie image">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                        Bonnie Green
                    </p>
                    <Rating />
                </div>
                <div class="inline-flex items-center text-base text-gray-900 line-clamp-3 max-w-[40rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque vel perspiciatis fugiat est rei aks
                    asad oopdkl podod
                </div>
            </div>
        </li>
        <li class="py-3 min-h-[6rem]">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <img class="w-16 h-16 rounded-full" src="https://picsum.photos/70?random=3" alt="Michael image">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                        Michael Gough
                    </p>
                    <Rating />
                </div>
                <div class="inline-flex items-center text-base text-gray-900 line-clamp-3 max-w-[40rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque vel perspiciatis fugiat est rei aks
                    asad oopdkl podod
                </div>
            </div>
        </li>
        <li class="py-3 min-h-[6rem]">
            <div class="flex items-center ">
                <div class="flex-shrink-0">
                    <img class="w-16 h-16 rounded-full" src="https://picsum.photos/70?random=4" alt="Lana image">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                        Lana Byrd
                    </p>
                    <Rating />
                </div>
                <div class="inline-flex items-center text-base text-gray-900 line-clamp-3 max-w-[40rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque vel perspiciatis fugiat est rei aks
                    asad oopdkl podod
                </div>
            </div>
        </li>
        <li class="pt-3 pb-0 sm:pt-4">
            <div class="flex items-center ">
                <div class="flex-shrink-0">
                    <img class="w-16 h-16 rounded-full" src="https://picsum.photos/70?random=5" alt="Thomas image">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                        Thomes Lean
                    </p>
                    <Rating />
                </div>
                <div class="inline-flex items-center text-base text-gray-900 line-clamp-3 max-w-[40rem]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque vel perspiciatis fugiat est rei aks
                    asad oopdkl podod
                </div>
            </div>
    </li>
</ul></template>