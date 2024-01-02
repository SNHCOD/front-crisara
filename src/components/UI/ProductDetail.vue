<script setup>
// Importar funcionalidades | utilidades
import { ref, defineAsyncComponent } from 'vue'
import ListProductsUseCase from '@/useCases/ListProductsUseCase';

// Importar componentes
import AddToCart from '@/components/UI/AddToCart.vue';
import ListComments from '@/components/UI/ListComments.vue';

// Definición de datos
const { item } = defineProps(['item']);
const related = ref([]);
const quantity = ref(1);
const SliderMultiItems = defineAsyncComponent(() => importAsyncComponent());
//{{ item.PRODUCTO + ' | ' + item.Descripcion }}

// Definición de métodos
// Función asincrónica para importar el componente
const importAsyncComponent = async () => {
  // Puedes realizar alguna lógica asíncrona aquí
  await loadData();

  // Importar el componente dinámicamente
  const SliderMultiItems = await import('@/components/UI/SliderMultiItems.vue');
  return SliderMultiItems.default; // Asegúrate de ajustar la ruta y el nombre del componente
};

const loadData = async () => {  
  await ListProductsUseCase.executeByRelated(item.CategoriaID)
    .then(response => {
      related.value = response.data;
    })
    .catch(error => {
      console.error('Error loading products:', error);
    })

};
</script>

<template>
  <div  class="mx-auto flex flex-col items-center bg-white md:flex-row w-[80rem]">
      <img class="object-cover w-[30rem] h-[30rem]" src="https://picsum.photos/700" alt="">
      <div class="grid grid-flow-row row-auto gap-6 overflow-y-auto p-4 max-h-[32rem]">
        <div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">{{ item.PRODUCTO + ' | ' + item.Descripcion }}</h5>
          <p class="mb-3 font-normal text-gray-700">Unidad de venta: {{ item.unity }}</p>
        </div>
        <div>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg class="w-4 h-4 ms-1 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <p class="ms-2 text-sm font-bold text-gray-900">4.95</p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
            <a href="#reviews" class="text-sm font-medium text-gray-900 underline hover:no-underline">73 reseñas</a>
          </div>
        </div>
        <div>
          <p class="mb-3 font-normal text-gray-700">Precio de venta: {{ item.PrecioWeb }}</p>
        </div>
        <div class="flex">
          <div class="relative flex max-w-[8rem]">
              <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" @click="quantity--" :disabled="quantity == 1">
                  <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                  </svg>
              </button>
              <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" v-model="quantity" required>
              <button type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"  @click="quantity++">
                  <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
          </div>
          <div class="w-4/6 mx-auto mt-0 mb-5">
              <AddToCart :product="product" />
          </div>
        </div>
        <div>
        </div>
        <div class="w-full text-gray-900 bg-white">
          <h1 class="text-lg font-medium">
            Razones para comprar con nosotros
          </h1>
            <div class="relative inline-flex items-center w-full px-4 py-2">
                <svg class="w-12 h-12 me-2.5 mr-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <div>
                  <h2 class="text-lg font-medium">
                    Profile
                  </h2>
                  <span class="text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, corrupti? Provident exercitationem consequatur.
                  </span>
                </div>
            </div>
            <div class="relative inline-flex items-center w-full px-4 py-2">
                <svg class="w-12 h-12 me-2.5 mr-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
                </svg>
                <div>
                  <h2 class="text-lg font-medium">
                    Settings
                  </h2>
                  <span class="text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, corrupti? Provident exercitationem consequatur.
                </span>
                </div>
            </div>
            <div class="relative inline-flex items-center w-full px-4 py-2">
                <svg class="w-12 h-12 me-2.5 mr-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                </svg>
                <div>
                  <h2 class="text-lg font-medium">
                    Messages
                  </h2>
                  <span class="text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, corrupti? Provident exercitationem consequatur.
                </span>
                </div>
            </div>
            <div class="relative inline-flex items-center w-full px-4 py-2">
                <svg class="w-12 h-12 me-2.5 mr-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>
                <div>
                  <h2 class="text-lg font-medium">
                    Download
                  </h2>
                  <span class="text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, corrupti? Provident exercitationem consequatur.
                </span>
                </div>
            </div>
        </div>
      </div>
  </div>
  <div id="reviews" class="flex flex-row mx-auto w-[80rem] my-10">
    <div>
      <h2 class="text-4xl font-medium">
        Reseñas del producto
      </h2>
      <button :class="'block rounded text-white mt-5 p-3 text-md font-medium transition bg-default hover:bg-pink-600'">
        Escribe una reseña
      </button>
    </div>
    <div class="min-w-[70%] ml-[2.083rem] max-h-[30rem] overflow-y-auto">
      <ListComments />
   </div>
  </div>
  <div class="w-[80rem] mx-auto my-20">
      <div class="w-full mx-auto text-center">
        <h1 class="text-4xl font-semibold underline underline-offset-8 decoration-default">Productos relacionados</h1>
      </div>
      <SliderMultiItems :items="related" />
  </div>
  
</template>