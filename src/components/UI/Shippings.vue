<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, computed, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
// Importar componentes
import { FwbInput, FwbSelect } from 'flowbite-vue'

// Definición de datos
// Datos de comportamiento
const { shippings } = defineProps(['shippings']);
const countries = [
  { value: '14', name: 'United States' },
  { value: '3', name: 'Canada' },
  { value: '555', name: 'MEXICO' },
]

// Datos de persistencia

// Datos manipulables del componente
const shippingsData = ref(shippings);

// Definición de ciclo de vida
onMounted(() => {
})

// Definición de métodos

</script>

<template>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-white uppercase bg-default">
            <tr>
                <th scope="col" class="px-6 py-3">
                    No. venta
                </th>
                <th scope="col" class="px-6 py-3">
                    No. artículos
                </th>
                <th scope="col" class="px-6 py-3">
                    SubTotal
                </th>
                <th scope="col" class="px-6 py-3">
                    Envío
                </th>
                <th scope="col" class="px-6 py-3">
                    Total
                </th>
                <th scope="col" class="px-6 py-3">
                    No. guía
                </th>
                <th scope="col" class="px-6 py-3">
                    Tipo de pago
                </th>
                <th scope="col" class="px-6 py-3">
                    Tipo de compra
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha compra
                </th>
                <th scope="col" class="px-6 py-3">
                    Ver detalle
                </th>
                <th scope="col" class="px-6 py-3">
                    Solicitar factura
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="shipp in shippingsData" :key="shipp.no_venta" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ shipp.no_venta }}
                </th>
                <td class="px-6 py-4">
                    {{ shipp.no_articulos }}
                </td>
                <td class="px-6 py-4">
                    {{ shipp.subtotal }}
                </td>
                <td class="px-6 py-4">
                    {{ shipp.envio }}
                </td>
                <td class="px-6 py-4">
                    {{ shipp.total }}
                </td>
                <td class="px-6 py-4">
                    {{ shipp.no_guia }}
                </td>
                <td class="px-6 py-4">
                    {{ shipp.tipo_pago }}
                </td>
                <td class="px-6 py-4">
                    Pending
                </td>
                <td class="px-6 py-4">
                    {{ shipp.fecha_compra }}
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600">Ver</a>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600">Solicitar</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>