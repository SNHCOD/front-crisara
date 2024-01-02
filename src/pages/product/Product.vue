<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, defineAsyncComponent } from 'vue';
import ListProductsUseCase from '@/useCases/ListProductsUseCase';

// Importar componentes
import AppLayout from '@/components/layout/AppLayout.vue';
import Loader from '@/components/UI/Loader.vue';
import EmptyResults from '@/components/UI/EmptyResults.vue';

// Definición de datos
const loading = ref(true);
const mode = ref('g');
const product = ref(null);
const path = window.location.href.split('=');
const id = path[1];
// Definir el componente asincrónico
const ProductDetail = defineAsyncComponent(() => importAsyncComponent());

// Definición de ciclo de vida
onMounted(() => {
  importAsyncComponent();
})

// Definición de métodos
// Función asincrónica para importar el componente
const importAsyncComponent = async () => {
  // Puedes realizar alguna lógica asíncrona aquí
  await loadData();

  // Importar el componente dinámicamente
  const ProductDetail = await import('@/components/UI/ProductDetail.vue');
  loading.value = false;
  return ProductDetail.default; // Asegúrate de ajustar la ruta y el nombre del componente
};

const loadData = async () => {  
  await ListProductsUseCase.executeById(id)
    .then(response => {
      product.value = response.data;
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });

};

const receiveToggle = (newMode) => {
  mode.value = newMode;
}

</script>

<template>
  <AppLayout>
    <Loader :loading="loading" />
    <div v-show="(!loading && product)" class="w-full mx-auto"> 
      <ProductDetail :item="product" />
    </div>   
    <div v-show="(!loading && !product)" class="w-5/6 p-10 mx-auto mt-5">  
      <EmptyResults>
        No hay productos en la categoría seleccionada
      </EmptyResults>
    </div>   
</AppLayout>
</template>