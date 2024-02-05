<script setup>
// Importar funcionalidades | utilidades
import { ref, watch } from 'vue';
import { useCartStore } from '@/store/services/cartStore';
import CustomerService from '@/services/CustomerService';


// Importar componentes
import Spinner from '@/components/UI/Spinner.vue';

// Definición de datos
const indicator = ref(false);
const added = ref(false);
// Texto dinámico del botón
const buttonText = ref('Agregar al carrito');
const props = defineProps(['product', 'quantity']);
const product = props.product;
const ofQuantity = ref(props.quantity);
const { getCartProducts, replaceCart } = useCartStore();
const cartProducts = ref(getCartProducts());

// Definición de métodos
const add = async () => {
    indicator.value = true;
    const body = {
        "discount": cartProducts.value.discount,
        "idShoppingCart": cartProducts.value.id,
        "items": [
            {
                "idShoppingCart": cartProducts.value.id,
                "idProduct": product.ProductoID,
                "price": product.PrecioWeb,
                "quantity": ofQuantity.value,
                "subtotal": parseFloat(parseFloat(product.PrecioWeb) * parseInt(ofQuantity.value)).toFixed(2)
            }
        ]
    };
    await CustomerService.updateShoppingCartItems(body)
    .then(response => {      
        const data = response.data;
        replaceCart(data)
        indicator.value = false;
        buttonText.value = 'Agregado';
        added.value = true;
    })
    .catch(error => {
        indicator.value = false;
        return;
    })
    await new Promise(resolve => setTimeout(() => {
        buttonText.value = 'Agregar al carrito';
        added.value = false;
        resolve();
    }, 750));
}

watch(props, () => {
    ofQuantity.value = props.quantity;
});
</script>

<template>
    <button :class="'block w-full rounded text-white p-3 text-sm font-medium transition ' + (indicator ? 'bg-pink-500' : (added ? 'bg-success' : 'bg-default hover:scale-105'))" @click="add" :disabled="indicator">
        <Spinner v-show="indicator" />
        <span v-show="!indicator">
            {{ buttonText }}
        </span>
    </button>
</template>