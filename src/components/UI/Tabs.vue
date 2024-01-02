<script setup>
// Importar funcionalidades | utilidades
import { ref } from 'vue'

// Definición de datos
const props = defineProps(['selectedTab', 'tabs']);
</script>

<template>
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px">
          <li class="me-2" v-for="(tab, index) in props.tabs" :key="tab.name">
              <a :href="tab.url" :class="'inline-block p-4 border-b-2 border-transparent rounded-t-lg active hover:text-default hover:border-pink-500' + (props.selectedTab == index ? ' text-default border-pink-500 bg-gray-100' : '')">
              {{ tab.name }}
              </a>
          </li>
        </ul>
    </div>
</template>