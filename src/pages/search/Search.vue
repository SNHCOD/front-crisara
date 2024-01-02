<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted } from 'vue';
import ListProductsUseCase from '@/useCases/ListProductsUseCase';

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
const path = window.location.href.split('-');
const page = path[1];
const param = path[2];

// Definición de ciclo de vida
onMounted(() => {
  loadData();
});

// Definición de métodos
const loadData = () => {  
    loading.value = true;
    ListProductsUseCase.executeByParam(page, param)
    .then(response => {
        products.value = response.data.products;
        loading.value = false;
    })
    .catch(error => {
      console.error('Error loading products:', error);
      loading.value = false;
    });
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
    </div>
    <div v-show="(!loading && products.length == 0)" class="w-5/6 p-10 mx-auto mt-5">  
      <EmptyResults>
        No hay productos relacionados con {{ decodeURIComponent(param) }}
      </EmptyResults>
    </div>    
</AppLayout>
</template>