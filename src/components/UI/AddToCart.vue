<script setup>
// Importar funcionalidades | utilidades
import { ref } from 'vue';
import { useCartStore } from '@/store/services/cartStore';

// Importar componentes
import Spinner from '@/components/UI/Spinner.vue';

// Definición de datos
const indicator = ref(false);
// Texto dinámico del botón
const buttonText = ref('Agregar al carrito');
const { product } = defineProps(['product']);
const { addToCart, increaseQuantity, removeFromCart, clearCart, getCartProducts } = useCartStore();

// Definición de métodos
const add = async () => {
    indicator.value = true;
    // Utiliza una función anónima dentro de setTimeout
    await new Promise(resolve => setTimeout(() => {
        addToCart(product);    
        indicator.value = false;
        resolve();
    }, 500));

}

</script>

<template>
    <button :class="'block w-full rounded text-white p-3 text-sm font-medium transition ' + (indicator ? 'bg-pink-500' : 'bg-default hover:scale-105')" @click="add" :disabled="indicator">
        <Spinner v-show="indicator" />
        <span v-show="!indicator">
            {{ buttonText }}
        </span>
    </button>
</template>