<script setup>
// Importar funcionalidades | utilidades
import { ref } from 'vue';

// Importar componentes

// Definición de datos
const carouselItems = ref([
  { image: 'https://picsum.photos/1800/1200?random=1', alt: 'Image 1' },
  { image: 'https://picsum.photos/1800/1200?random=2', alt: 'Image 2' },
  { image: 'https://picsum.photos/1800/1200?random=3', alt: 'Image 3' },
  { image: 'https://picsum.photos/1800/1200?random=4', alt: 'Image 4' },
  { image: 'https://picsum.photos/1800/1200?random=5', alt: 'Image 5' },
]);
const currentIndex = ref(0);

// Definición de métodos
const setCurrentIndex = (index) => {
  currentIndex.value = index;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
};
</script>

<template>
    <div id="default-carousel" class="relative w-full" data-carousel="slide">
        <!-- Carousel wrapper -->
        <div class="relative h-[40rem] overflow-hidden transition-all">
        <!-- Iterar sobre los ítems del slider -->
        <div v-for="(item, index) in carouselItems" :key="index" :class="{ 'fadeIn': currentIndex === index, 'fadeOut': currentIndex !== index }"
            data-carousel-item>
            <img :src="item.image" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        </div>
        <!-- Slider controls -->
        <button type="button"
            class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            @click="prevSlide" data-carousel-prev>
            <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 1 1 5l4 4" />
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button"
                class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                @click="nextSlide" data-carousel-next>
            <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 9 4-4-4-4" />
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
    </div>
</template>
<style>
.fadeIn {
  opacity: 1;
  transition: opacity 0.7s ease-in-out;
}

.fadeOut {
  opacity: 0;
  transition: opacity 0.7s ease-in-out;
}
</style>