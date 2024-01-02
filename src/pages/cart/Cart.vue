<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted  } from 'vue'
import { useCartStore } from '@/store/services/cartStore';

// Importar componentes
import AppLayout from '../../components/layout/AppLayout.vue';
import { FwbBadge } from 'flowbite-vue'

// Definición de datos
const { addToCart, increaseQuantity, removeFromCart, clearCart, getCartProducts } = useCartStore();
const cartProducts = ref(getCartProducts());

// Definición de ciclo de vida
// Lógica de escucha de eventos en el componente
onMounted(() => {
  window.addEventListener('localstorage-changed', (event) => {
    console.log('change');
    cartProducts.value = getCartProducts();
  });
});

// Definición de métodos
const increaseAmount = (id, amount) => {
  increaseQuantity(id, amount);
}
</script>

<template>
  <AppLayout>
    <div class="w-11/12 md:w-2/3 mx-auto pt-5 max-h-[50vh] mb-20">
      <h2 class="text-2xl text-default font-semibold">
        Mi carrito
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="col-span-2 pt-6 pl-6 pr-6 pb-2 bg-white border border-gray-200 rounded-lg shadow max-h-[50vh] overflow-y-auto">
          <div class="grid row-auto divide-gray-300 divide-y-0 md:divide-y gap-5">
            <div class="grid-cols-7 hidden md:grid">
              <div class="col-span-4">
                <p>
                  Producto
                </p>
              </div>
              <div class="col-span-2 mx-auto">
                <p>
                  Cantidad
                </p>
              </div>
              <div class="mx-auto">
                <p>
                  Total
                </p>
              </div>
            </div>
            <div v-for="(product, index) in cartProducts" class="grid grid-cols-7 md:pt-4">
              <div class="col-span-7 md:col-span-4">
                <div class="grid grid-rows-2 grid-flow-col gap-2">
                  <div class="row-span-3">
                    <img src="https://picsum.photos/200/300" alt="foto de producto" class="w-24 h-24">
                  </div>
                  <div>
                    <p class="text-base mt-2">
                      {{ product.Descripcion }}
                    </p>
                  </div>
                  <div>
                    <p class="text-base mt-2">
                      {{ product.PrecioWeb }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-span-3 md:col-span-2 mx-auto">
                  <div class="relative flex max-w-[8rem]">
                      <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" @click="increaseAmount(product.PRODUCTO, -1)">
                          <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                          </svg>
                      </button>
                      <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" v-model="product.quantity" required>
                      <button type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"  @click="increaseAmount(product.PRODUCTO, 1)">
                          <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                          </svg>
                      </button>
                  </div>
              </div>
              <div class="col-span-3 md:col-span-1">
                <fwb-badge size="md" type="green" class="mx-auto mt-2">
                  <template #icon>
                    <svg class="w-3 h-3 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"/>
                  </svg>
                  </template>
                    {{ (product.PrecioWeb * product.quantity).toFixed(2) }}
                </fwb-badge>
              </div>
            </div>
          </div>
        </div>
        <div class="max-h-[50vh] p-6 bg-white border border-gray-200 rounded-lg shadow">
            <svg class="w-7 h-7 text-gray-500 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
            </svg>
            <a href="#">
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Need a help in Claim?</h5>
            </a>
            <p class="mb-3 font-normal text-gray-500">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
            <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
                See our guideline
                <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
            </a>
        </div>
      </div>  
    </div>
  </AppLayout>
</template>
