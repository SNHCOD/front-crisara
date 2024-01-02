<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, defineProps, defineAsyncComponent } from 'vue'

// Importar componentes
import Card from '@/components/UI/Card.vue';

// Definición de datos
const { items } = defineProps(['items']);
const active = ref(0);
const direction = ref(0);
const dividedGroups = ref([]);
const currentIndex = ref(0);

// Definición de ciclo de vida

// Definición de métodos
onMounted(() => {
    divideDataIntoGroups();
});

const divideDataIntoGroups = () => {
    const groupSize = 4;
    dividedGroups.value = [];
    
    for (let i = 0; i < items.length; i += groupSize) {
        dividedGroups.value.push(items.slice(i, i + groupSize));
    }
};

const setGroup = (dir) => {
    if(active.value == 2) {
        active.value = 0;
    } else {
        active.value += 1;
    }
    direction.value = dir;
}

const setCurrentIndex = (index) => {
  currentIndex.value = index;
};

const prevSlide = () => {
    console.log(dividedGroups.value.length);
    console.log(currentIndex);
  currentIndex.value = (currentIndex.value - 1 + dividedGroups.value.length) % dividedGroups.value.length;
    console.log(currentIndex);
};

const nextSlide = () => {
    console.log(dividedGroups.value.length);
    console.log(currentIndex);
  currentIndex.value = (currentIndex.value + 1) % dividedGroups.value.length;
    console.log(currentIndex);
};

</script>

<template>
    <div class="">
        <div id="controls-carousel" class="relative w-full" data-carousel="static">
            <!-- Carousel wrapper -->
            <div class="mt-10 relative h-[36rem] overflow-hidden rounded-lg transition-all">
                <!-- Item 1 -->
                <div v-for="(group, index) in dividedGroups" :class="'grid grid-cols-4 gap-4 absolute ' + (currentIndex === index ? 'fadeIn' : 'fadeOut')" >
                    <Card v-for="(item, i) in group" :product="item" :key="i"/>
                </div>
            </div>
            <!-- Slider controls -->
            <button type="button" 
                class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
                @click="prevSlide" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/50 group-hover:bg-default group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" 
                class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
                @click="nextSlide" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/50 group-hover:bg-default group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg class="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>
    </div>
</template>