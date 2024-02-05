<script setup>
// Importar funcionalidades | utilidades
import { ref, defineEmits } from 'vue'

// Definición de datos
const mode = ref('g');
const emit = defineEmits();

// Definición de métodos
const toggleMode = (value) => {
    emit('toggle', value);
    mode.value = value;
};
</script>
<template>
    <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg border sm:flex">
        <li class="w-full">
            <button :class="'inline-block w-full p-4 xborder-s-0 border-gray-200 rounded-s-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ' + (mode == 's' ? 'text-white bg-default active' : 'bg-white hover:text-white hover:bg-default')" @click="toggleMode('s')">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
                </svg>
            </button>
        </li>
        <li class="w-full">
            <button :class="'inline-block w-full ml-0.5 p-4 xborder-s-0 border-gray-200 rounded-e-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ' + (mode == 'g' ? 'text-white bg-default active' : 'bg-white hover:text-white hover:bg-default')" @click="toggleMode('g')">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
            </button>
        </li>
    </ul>
</template>