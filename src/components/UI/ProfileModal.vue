<script setup>
// Importar funcionalidades | utilidades
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/store/services/sessionStore';

// Importar componentes

// Definición de datos
const { login, clearSession, saveSession, loadSession, getSession } = useSessionStore();
const open = ref(false);
const router = useRouter()

// Definición de ciclo de vida

// Definición de métodos
const toggleOpen = () => {
    open.value = !open.value;
}
const logout = () => {
    clearSession();
    window.location.href = "/";
}
</script>

<template>
    <button id="dropdownDefaultButton" class="mt-1.5 text-white bg-default hover:bg-default/50 focus:ring-2 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button" @click="toggleOpen">
        Mi perfil 
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
        </svg>
    </button>
    <div v-if="open" id="dropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-10" v-on:mouseleave="toggleOpen">
        <ul class="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            <li>
                <a href="/profile" class="block w-full px-4 py-2 hover:bg-gray-100">Mi perfil</a>
            </li>
            <li>
                <button type="button" class="block w-full px-4 py-2 hover:bg-gray-100 text-red-600 text-left" @click="logout">Cerrar sesión</button>
            </li>
        </ul>
    </div>
</template>