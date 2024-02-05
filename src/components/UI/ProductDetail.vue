<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, defineAsyncComponent } from 'vue'
import ProductService from '@/services/ProductService';
import { useSettingsStore } from '@/store/services/settingsStore';
import { useSessionStore } from '@/store/services/sessionStore';

// Importar componentes
import AddToCart from '@/components/UI/AddToCart.vue';
import ListComments from '@/components/UI/ListComments.vue';
import CommentForm from '@/components/UI/CommentForm.vue';

// Definición de datos
const { getBuyadvantage } = useSettingsStore();
const { getUserdata } = useSessionStore();
const customer = getUserdata();
const conf = getBuyadvantage();
const showForm = ref(false);
const items = ref([]);
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
  const response = await ProductService.getRelated(item.CategoriaID);
  related.value = response.data;
};

onMounted(() => {
  items.value = JSON.parse(conf.content)
})
</script>

<template>
  <div  class="mx-auto flex flex-col items-center bg-white md:flex-row w-[80rem]">
      <img class="object-cover min-w-[30rem] w-[30rem] h-[30rem]" src="https://picsum.photos/700" alt="">
      <div class="grid grid-flow-row row-auto gap-6 overflow-y-auto overflow-x-hidden p-4 max-h-[32rem]">
        <div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">{{ item.PRODUCTO + ' | ' + item.Descripcion }}</h5>
          <p class="mb-3 font-normal text-gray-700">Unidad de venta: {{ item.unity }}</p>
        </div>
        <div>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <p class="ms-2 text-sm font-bold text-gray-900">{{ item.average_rate/10 }}</p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
            <a href="#reviews" class="text-sm font-medium text-gray-900 underline hover:no-underline">{{ item.comments.length }} reseñas</a>
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
              <AddToCart :product="item" :quantity="quantity" />
          </div>
        </div>
        <div>
        </div>
        <div class="w-full text-gray-900 bg-white">
          <h1 class="text-lg font-medium">
            Razones para comprar con nosotros
          </h1>
            <div v-for="(item, index) in items" :key="index" class="relative grid grid-cols-12 items-center w-[48rem] px-4 py-2 overflow-hidden">
              <div class="col-span-1" v-html="item.svg"></div>
                <div class="col-span-11 ml-5 overflow-hidden">
                  <h2 class="text-lg font-medium capitalize">
                    {{ item.title }}
                  </h2>
                  <span class="text-sm line-clamp-2">
                    {{ item.content }}
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
      <button v-show="showForm" type="button" @click="showForm = !showForm" class="ml-[90%] text-gray-700  hover:text-gray-900 focus:outline-none rounded-full text-sm p-2.5 text-center inline-flex items-center">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
      <button :class="'block rounded text-white mt-5 p-3 text-md font-medium transition bg-default hover:bg-pink-600'" v-show="!showForm" @click="showForm = !showForm">
        Escribe una reseña
      </button>
      <div class="mt-5">
        <CommentForm v-show="showForm" 
        :aud_data="{'customer_id': (customer ? customer.data.id : null), 'product_id': item.ProductoID, 'name': (customer ? customer.data.nombre : ''), 'user': (customer ? true : false), 'sku': item.PRODUCTO.replace(/\s/g, '')}"/>
      </div>
    </div>
    <div class="min-w-[70%] ml-[2.083rem] max-h-[30rem] overflow-y-auto">
      <ListComments v-if="item.comments.length > 0" :comments="item.comments" />
      <div v-else class="w-full border p-5 flex flex-row gap-16 place-items-center">
        <h2>
          {{ !showForm ? 'No hay reseñas' : 'Esperando tu comentario'}}
        </h2>
        <button :class="'block rounded text-white p-3 text-md font-medium transition bg-default hover:bg-pink-600'" v-show="!showForm" @click="showForm = !showForm">
          Escribe una...
        </button>
      </div>
   </div>
  </div>
  <div class="w-[80rem] mx-auto my-20">
      <div class="w-full mx-auto text-center">
        <h1 class="text-4xl font-semibold underline underline-offset-8 decoration-default">Productos relacionados</h1>
      </div>
      <SliderMultiItems :items="related" />
  </div>
  
</template>