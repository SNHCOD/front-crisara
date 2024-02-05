<script setup>
// Importar funcionalidades | utilidades

// Definición de datos

// Definición de ciclo de vida

// Definición de métodos

</script>
<template>
    <div class="grid grid-cols-4 gap-4 my-10">
        <div v-for="item in Array(4)" role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div class="w-full">
                <div class="flex items-center justify-center h-64 bg-gray-500 rounded w-72 mx-auto">
                <svg class="w-10 h-16 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
                <div class="h-4 bg-gray-500 rounded-full w-32 mt-5 ml-5 mb-2.5"></div>
                <div class="h-4 bg-gray-500 rounded-full w-10 ml-5 mb-2.5"></div>
                <div class="h-4 bg-gray-500 rounded-full w-[21rem] mt-5 ml-3 mb-2.5"></div>
                <div class="h-4 bg-gray-500 rounded-full w-32 ml-3 mb-2.5"></div>
                <div class="h-4 bg-gray-500 rounded-full w-24 mt-5 ml-3 mb-2.5"></div>
                <div class="h-12 bg-gray-500 rounded-lg w-[20rem] mt-5 ml-4 mb-2.5"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>