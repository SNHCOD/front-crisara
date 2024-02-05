<script setup>
// Importar funcionalidades | utilidades
import { ref } from 'vue';
import Rating from '@/components/UI/Rating.vue';

// Importar componentes

// Definición de datos
const { comments } = defineProps(['comments']);

// Definición de métodos
</script>

<template>
    <ul role="list" class="w-full border p-5 divide-y divide-gray-200 gap-y-4">
        <li v-for="(comment, i) in comments" :key="i" class="py-3 min-h-[6rem]">
            <div class="flex flex-row items-center">
                <div class="flex-shrink-0">
                    <img class="w-16 h-16 rounded-full" src="https://picsum.photos/70?random=1" alt="Neil image">
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-base font-medium text-gray-900 truncate capitalize">
                        {{ comment.customer ? comment.customer.razonSocial : comment.name }}
                    </p>
                    <Rating :ratting="comment.rate/10" />
                </div>
                <div class="inline-flex items-center text-base text-gray-900 line-clamp-3 max-w-[40rem]">
                    {{ comment.comment }}
                </div>
            </div>
        </li>
</ul></template>