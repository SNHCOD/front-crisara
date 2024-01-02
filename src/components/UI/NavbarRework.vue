<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted } from 'vue';
import ListCategoriesUseCase from '@/useCases/ListCategoriesUseCase';
import ListProductsUseCase from '@/useCases/ListProductsUseCase';
import { navLinks } from '@/utils/navLinks';
import { useSessionStore } from '@/store/services/sessionStore';

// Importar componentes
import DropDownMenu from '@/components/UI/DropDownMenu.vue';
import CartModal from '@/components/UI/CartModal.vue';
import ProfileModal from '@/components/UI/ProfileModal.vue';
import Loader from '@/components/UI/Loader.vue';

// Definición de datos
const { logged } = useSessionStore();
const session = logged();
const openMenu = ref(false);
const loading = ref(false);
const categories = ref([]);
const products = ref([]);
const param = ref('');

// Definición de ciclo de vida
onMounted(() => {
  loadData();
});

// Definición de métodos
const loadData = () => {  
  ListCategoriesUseCase.execute()
    .then(response => {
      categories.value = response.data;
    })
    .catch(error => {
      console.error('Error loading categories:', error);
    });
};

// Función para manejar el evento 'Enter' en el campo de entrada
const search = (page) => {    
    window.location.href = '/search/?conf=-' + page + '-' + String(param.value); // Reemplaza 'NUEVA_URL' con la URL a la que deseas redirigir

    loading.value = true;
    ListProductsUseCase.executeByParam(page, param)
    .then(response => {
        products.value = response.data;
        loading.value = false;
    })
    .catch(error => {
      console.error('Error loading products:', error);
      loading.value = false;
    });
};
</script>

<template>
    <Loader :loading="loading" />
    <nav class="bg-white border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://crisarabisuteria.com/public/images/logo-crisara.png" class="h-20" alt="Flowbite Logo" />
            </a>
            <div class="flex md:order-2">
                <button @click="openMenu = !openMenu" data-collapse-toggle="navbar-search" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                    aria-controls="navbar-search" aria-expanded="false">
                    <span class="sr-only">Abrir menú</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div class="relative hidden lg:flex flex-wrap gap-4">       
                    <ProfileModal v-if="session" />        
                    <p v-else class="mt-3">
                        <a href="/auth/?t=0" class="hover:text-default">Inciar sesión </a>
                        /
                        <a href="/auth/?t=1" class="hover:text-default">Registrarme</a>
                    </p>
                    <CartModal class="mt-3" />
                </div>
            </div>
            <div :class="'items-center justify-between w-full md:flex md:w-auto md:order-1 ' + (openMenu ? '' : 'hidden')"
                id="navbar-search">
                <div class="relative mt-3 md:hidden">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="search-navbar"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-default focus:border-default "
                        placeholder="Buscar productoa">
                </div>
                <ul
                    class="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white ">
                    <li v-for="link in navLinks">
                        <a v-show="link.type === 'link'" :href="link.url"
                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-default md:p-0"
                            aria-current="page">{{ link.name }}</a>
                        <DropDownMenu v-show="link.type === 'dropdown'" :categories="categories"> 
                            {{ link.name }}
                        </DropDownMenu>
                    </li>
                </ul>
                <ul
                    class="flex flex-col p-4 lg:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white md:hidden">
                    <li>
                        <a href="/auth/?t=0" class="block py-2 px-3 text-gray-900 rounded lg:p-0">Inciar sesión</a>
                    </li>
                    <li>
                        <a href="/auth/?t=1" class="block py-2 px-3 text-gray-900 rounded lg:p-0">Registrarme</a>
                    </li>
                    <a class="flex flex-wrap gap-4 py-2 px-3 text-gray-900 rounded lg:p-0" href="/cart/">
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                        </svg>
                        <p class="font-medium">
                            Carrito
                        </p>
                    </a>
                </ul>
            </div>
            <div class="absolute mt-[5.5em] lg:ml-[18em] lg:w-1/3 md:w-3/4 md:ml-[11em] lg:block hidden">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="param" type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-default focus:border-default " placeholder="Buscar producto..." @keyup.enter="search(1)">
            </div>
        </div>
    </nav>
</template>