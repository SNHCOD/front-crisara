<script setup>
import { ref } from 'vue'

const selected = ref("first")
</script>

<template>
<div class="w-full md:w-2/3 mx-auto bg-white border-t border-gray-200 rounded-lg ">
    <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select tab</label>
        <select id="tabs" class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-default focus:border-default block w-full p-2.5">
            <option>Nos distinguimos</option>
            <option>Propósito</option>
            <option>Sabemos lo que buscas</option>
        </select>
    </div>
    <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex rtl:divide-x-reverse" role="tablist">
        <li class="w-full">
            <button id="stats-tab" type="button" role="tab" :class="'inline-block w-full p-4 rounded-ss-lg text-xl font-semibold hover:bg-gray-100 focus:outline-none hover:text-default ' + (selected != 'first' ? 'bg-gray-50 text-gray-900' : 'bg-gray-100 text-default')" @click="selected = 'first'">Nos distinguimos</button>
        </li>
        <li class="w-full">
            <button id="about-tab" type="button" role="tab" :class="'inline-block w-full p-4 text-xl font-semibold hover:bg-gray-100 focus:outline-none hover:text-default ' + (selected != 'second' ? 'bg-gray-50 text-gray-900' : 'bg-gray-100 text-default')" @click="selected = 'second'">Propósito</button>
        </li>
        <li class="w-full">
            <button id="faq-tab" type="button" role="tab" :class="'inline-block w-full p-4 rounded-se-lg text-xl font-semibold hover:bg-gray-100 focus:outline-none hover:text-default ' + (selected != 'third' ? 'bg-gray-50 text-gray-900' : 'bg-gray-100 text-default')" @click="selected = 'third'">Sabemos lo que buscas</button>
        </li>
    </ul>
    <div id="fullWidthTabContent" class="border-t border-gray-200">
        <div :class="'p-4 bg-white rounded-lg md:p-8 ' + (selected != 'first' ? 'hidden' : '')" id="stats" role="tabpanel">
            <dl class="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium">Calidad</dt>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium">Precio</dt>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium">Atención</dt>
                </div>
            </dl>
            <div class="container">
                <div class="mx-auto w-full md:w-2/3">
                    <span class="text-xl break-words leading-loose">
                        Es lo que distingue a Crisara Bisutería, una empresa joven 100% mexicana que ofrece y comercializa insumos de joyería y bisutería de la más alta calidad en el occidente del país.
                    </span>
                </div>
            </div>
        </div>
        <div :class="'p-4 bg-white rounded-lg md:p-8 ' + (selected != 'second' ? 'hidden' : '')" id="about" role="tabpanel">
            <dl class="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium"></dt>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium"></dt>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium"></dt>
                </div>
            </dl>
            <div class="container">
                <div class="mx-auto w-full md:w-2/3">
                    <span class="text-xl break-words leading-loose">
                        Siguiendo el firme propósito de ofrecer productos de la más alta calidad y al mejor precio, <span class="font-semibold">Crisara Bisutería</span> se consolida día con día como uno de los proveedores de insumos para las joyerías más grande y eficiente de todo el país.
                    </span>
                </div>
            </div>
        </div>
        <div :class="'p-4 bg-white rounded-lg md:p-8 ' + (selected != 'third' ? 'hidden' : '')" id="faq" role="tabpanel">
            <dl class="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium"></dt>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium"></dt>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-xl font-medium"></dt>
                </div>
            </dl>
            <div class="mx-auto w-full md:w-2/3">
                    <span class="text-xl break-words leading-loose">
                        Originalidad y Vanguardia. Por eso creamos diseños exclusivos y únicos. Nuestros productos son hechos a mano, utilizando insumos de la mejor calidad y piedras naturales, nos enfocamos en satisfacer los gustos de nuestros clientes.
                    </span>
                </div>
        </div>
    </div>
</div>

</template>