<script setup>
// Importar funcionalidades | utilidades
import { ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import ProductService from '@/services/ProductService';

// Importar componentes
import AppLayout from '@/components/layout/AppLayout.vue';
import Loader from '@/components/UI/Loader.vue';
import EmptyResults from '@/components/UI/EmptyResults.vue';
import GridList from '@/components/UI/GridList.vue';
import StackList from '@/components/UI/StackList.vue';
import ToggleList from '@/components/UI/ToggleList.vue';

// Definición de datos
const loading = ref(true);
const mode = ref('g');
const products = ref([]);
const pagination = ref([]);
const route = useRoute();
const category = route.query.id;
// Definir el componente asincrónico
const Pagination = defineAsyncComponent(() => importAsyncComponent());

// Definición de ciclo de vida

// Definición de métodos// Definición de métodos
// Función asincrónica para importar el componente
const importAsyncComponent = async () => {
  // Puedes realizar alguna lógica asíncrona aquí
  await loadData();

  // Importar el componente dinámicamente
  const Pagination = await import('@/components/UI/Pagination.vue');
  loading.value = false;
  return Pagination.default; // Asegúrate de ajustar la ruta y el nombre del componente
};

const loadData = async () => {  
  const response = await ProductService.getProductsByCategory(category);
  products.value = response.data.products;
  pagination.value = response.data.pagination;
};

const receiveToggle = (newMode) => {
  mode.value = newMode;
}
</script>
<template>
  <AppLayout>
    <Loader :loading="loading" />
    <div v-show="(!loading && products.length > 0)" class="w-5/6 p-10 mx-auto">      
      <div class="grid grid-cols-1 place-items-end mb-10">
        <ToggleList :mode="mode" @toggle="receiveToggle"/>
      </div>
      <GridList v-show="mode == 'g'" :items="products" />
      <StackList v-show="mode == 's'" :items="products" />
      <Pagination v-show="products.length > 0 && !loading" :total="pagination.total" :perPage="pagination.per_page" :countPages="pagination.total_pages" :links="pagination.links" prefix="category" />
    </div>
    <div v-show="(!loading && products.length == 0)" class="w-5/6 p-10 mx-auto mt-5">  
      <EmptyResults>
        No hay productos en la categoría seleccionada
      </EmptyResults>
    </div>    
</AppLayout>
</template>