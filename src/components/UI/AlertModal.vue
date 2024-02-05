<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted } from 'vue';

// Importar componentes

// Definición de datos
const svgs = [
    '<svg class="mx-auto mb-4 text-blue-500 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>',
    '<svg class="mx-auto mb-4 text-red-500 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>',
    '<svg class="mx-auto mb-4 text-green-500 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>',
];
const svgString = ref("");

const { type, open } = defineProps(['type']);
// Texto dinámico del botón

// Definición de métodos

// Definición de ciclo de vida
onMounted(() => {
    switch(type) {
        case 'error':
            svgString.value = svgs[1];
            break;
        case 'correcto':
            svgString.value = svgs[2];
            break;
        default:
            svgString.value = svgs[0];
            break;
    }
})


</script>

<template>
    <div id="popup-modal" tabindex="-1" class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="relative p-4 mx-auto my-[calc(30vh)] w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow">
                <div class="p-4 md:p-5 text-center">
                    <div class="my-10" v-html="svgString"></div>
                    <h3 class="my-10 text-lg font-normal text-gray-500">
                        <slot>

                        </slot>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>