<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, defineAsyncComponent } from 'vue';
import ProductService from '@/services/ProductService';

// Importar componentes
import AppLayout from '@/components/layout/AppLayout.vue';
import SkeletonLoading from '@/components/UI/SkeletonLoading.vue';
import Carousel from '@/components/UI/Carousel.vue';

// Definición de datos
const bestSeller = ref([]);
const newer = ref([]);
const preview = ref([]);
const loading = ref(true);
// Definir el componente asincrónico
const SliderMultiItems = defineAsyncComponent(() => importAsyncComponent());

// Definición de ciclo de vida
onMounted(() => {
  importAsyncComponent();
});

// Definición de métodos
// Función asincrónica para importar el componente
const importAsyncComponent = async () => {
  // Puedes realizar alguna lógica asíncrona aquí
  await loadData();

  // Importar el componente dinámicamente
  const SliderMultiItems = await import('@/components/UI/SliderMultiItems.vue');
  loading.value = false;
  return SliderMultiItems.default; // Asegúrate de ajustar la ruta y el nombre del componente
};


const loadData = async () => {  
  await ProductService.getBestSeller()
    .then(response => {
      bestSeller.value = response.data;
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });

  await ProductService.getNewer()
    .then(response => {
      newer.value = response.data;
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });

  await ProductService.getPreview()
    .then(response => {
      preview.value = response.data;
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });
};
</script>

<template>
  <AppLayout>
    <Carousel />
    <div class="w-5/6 p-10 mx-auto mt-5">  
      <div class="w-full mx-auto text-center mt-5">
        <h1 class="text-4xl font-semibold underline underline-offset-8 decoration-default">Lo más vendido!</h1>
      </div>
      <SliderMultiItems :items="bestSeller" />
      <SkeletonLoading v-show="loading" />
      <div class="w-full mx-auto text-center mt-10">
        <h1 class="text-4xl font-semibold underline underline-offset-8 decoration-default">Lo más reciente!</h1>
      </div>
      <SliderMultiItems :items="newer" />
      <SkeletonLoading v-show="loading" />
      <div class="w-full mx-auto text-center mt-10">
        <h1 class="text-4xl font-semibold underline underline-offset-8 decoration-default">Nuestros productos</h1>
      </div>
      <SliderMultiItems :items="preview" />
      <SkeletonLoading v-show="loading" />
      <div v-show="!loading" class="w-1/5 mx-auto mt-5">
        <a href="/products?page=1"
            class="block w-full rounded bg-default text-white p-4 text-sm font-medium transition hover:scale-105 text-center">
            Ver todos
        </a>
      </div>
    </div>
  </AppLayout>
</template>
