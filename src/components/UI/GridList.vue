<script setup>
// Importar funcionalidades | utilidades
import { ref, defineAsyncComponent } from 'vue'

// Importar componentes

// Definición de datos
const { items } = defineProps(['items']);
const Card = defineAsyncComponent(() => importAsyncComponent());

// Función asincrónica para importar el componente
const importAsyncComponent = async () => {
  // Puedes realizar alguna lógica asíncrona aquí
  await loadData();

  // Importar el componente dinámicamente
  const Card = await import('@/components/UI/Card.vue');
  return Card.default; // Asegúrate de ajustar la ruta y el nombre del componente
};
const loadData = async () => {  
  while(!items) ;
  return;
};
</script>

<template>
    <div class="grid grid-cols-1 gap-0 lg:grid-cols-4 lg:gap-6">
        <Card v-for="(item, index) in items" :product="item" :key="index"/>
    </div>
</template>