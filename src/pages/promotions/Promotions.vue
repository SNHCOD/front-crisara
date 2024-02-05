<script setup>
import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel,
} from 'flowbite-vue'
import AppLayout from '../../components/layout/AppLayout.vue';

</script>

<template>
  <AppLayout>
    <section class="bg-white">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 py-5">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">Aún no hay nada por aquí</h1>
            <p class="max-w-2xl mb-6 font-normal text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">Puedes revisar las demás secciones de Crisara.</p>
            <a href="/" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg bg-default hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 ">
                Regresar a la página principal
            </a> 
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-error-404_114360-1811.jpg?size=626&ext=jpg&ga=GA1.1.1016474677.1697068800&semt=ais" alt="mockup">
        </div>                
    </div>
</section>
</AppLayout></template>
