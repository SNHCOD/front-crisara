<script setup>
// Importar funcionalidades | utilidades
import { ref, defineEmits } from 'vue'

// Definición de datos
const props = defineProps(['total', 'perPage', 'countPages', 'links', 'prefix']);

// Definición de métodos
</script>
<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
            <p class="text-sm text-gray-700">
                Mostrando
                <span class="font-medium">{{ props.perPage && props.perPage }}</span>
                de
                <span class="font-medium">{{ props.total && props.total }}</span>
                resultados
            </p>
            </div>
            <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a :href="props.links && props.links.previous_page" :class="'relative inline-flex items-center rounded-l-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-default hover:text-white focus:z-20 focus:outline-offset-0 ' + (props.links && props.links.previous_page ? '' : 'pointer-events-none opacity-50 cursor-not-allowed')">
                <span class="sr-only">Anterior</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
                <span>Anterior</span>
                </a>
                <a v-for="(link, index) in props.links && props.links.pages" :href="'/' + props.prefix + '/?page=' + link" :class="'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 ' + (props.links && props.links.current_page == link ? 'bg-default text-white' : ' hover:bg-default hover:text-white')">{{ link.substr(0, 1) }}</a>
                <a :href="props.links && props.links.next_page" :class="'relative inline-flex items-center rounded-r-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-default hover:text-white focus:z-20 focus:outline-offset-0 ' + (props.links && props.links.next_page ? '' : 'pointer-events-none opacity-50 cursor-not-allowed') ">
                    <span class="sr-only">Siguiente</span>
                    <span>Siguiente</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </a>
            </nav>
            </div>
        </div>
        </div>

</template>