<script setup>
// Importar funcionalidades | utilidades
import { ref, defineProps } from 'vue';

// Importar componentes

// Definición de datos
const toggle = ref(false);
const props = defineProps(['categories']);

// Definición de ciclo de vida
</script>

<template>
    <div>
        <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-default md:p-0 cursor-pointer" link="#" @click="toggle = !toggle" >
            <slot></slot>
        </a>
        <!-- Dropdown menu -->
        <div id="dropdownNotification"
            :class="'z-50 w-full max-w-5xl bg-white rounded-lg shadow absolute ' + (toggle ? '' : 'hidden')">
            <div class="flex flex-wrap gap-2 p-3" v-on:mouseleave="toggle = !toggle">
                <div class="min-w-[15rem] max-w-xs" v-for="category in categories">
                    <a :href="'/category?id=' + category.CategoriaID" class="text-xs capitalize hover:text-default">
                        {{ category.Descripcion }}
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>