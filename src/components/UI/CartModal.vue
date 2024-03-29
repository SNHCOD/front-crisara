<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/services/cartStore';
import { useSessionStore } from '@/store/services/sessionStore';
import CustomerService from '@/services/CustomerService';

// Importar componentes
import { FwbBadge } from 'flowbite-vue'
import EmptyCart from '@/components/UI/EmptyCart.vue';

// Definición de datos
const toggle = ref(false);
const indicator = ref(false);
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const cartProducts = ref(cartStore.getCartProducts());
const count = ref(0);
const { logged } = useSessionStore();
const session = logged();

// Definición de ciclo de vida
  watch(cart, () => {
    setToggle();
    cartProducts.value = cartStore.getCartProducts();
  })
// Definición de métodos
const add = async (product, quantity) => {
    indicator.value = true;
    const body = {
        "discount": cartProducts.value.discount,
        "idShoppingCart": cartProducts.value.id,
        "items": [
            {
                "idShoppingCart": cartProducts.value.id,
                "idProduct": product.ProductoID,
                "price": product.PrecioWeb,
                "quantity": quantity,
                "subtotal": parseFloat(parseFloat(product.PrecioWeb) * parseInt(quantity)).toFixed(2)
            }
        ]
    };
    await CustomerService.updateShoppingCartItems(body)
    .then(response => {      
        const data = response.data;
        cartStore.replaceCart(data);
        indicator.value = false;
    })
    .catch(error => {
        indicator.value = false;
        return;
    })
}

const substract = async (product, quantity) => {
    indicator.value = true;
    const body = {
        "sub": true,
        "discount": cartProducts.value.discount,
        "idShoppingCart": cartProducts.value.id,
        "items": [
            {
                "idShoppingCart": cartProducts.value.id,
                "idProduct": product.ProductoID,
                "price": product.PrecioWeb,
                "quantity": quantity,
                "subtotal": parseFloat(parseFloat(product.PrecioWeb) * parseInt(quantity)).toFixed(2)
            }
        ]
    };
    await CustomerService.updateShoppingCartItems(body)
    .then(response => {      
        const data = response.data;
        cartStore.replaceCart(data);
        indicator.value = false;
    })
    .catch(error => {
        indicator.value = false;
        return;
    })
}

const setToggle = () => {
    toggle.value = !toggle.value;
}

onMounted(() => {
    count.value = cartProducts.length;
})
</script>

<template>
    <div>        
        <button class="flex flex-wrap gap-4 hover:text-default hover:cursor-pointer" @click="setToggle">
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
            </svg>
            <p class="font-medium">
                Carrito
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-default border-2 border-white rounded-full -top-2 -end-5">
                    {{ cartProducts.totalItems }}
                </div>
            </p>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdownNotification" :class="'z-50 w-[34rem] bg-white rounded-lg shadow absolute top-[1.50rem] left-0 ' + (toggle ? '' : 'hidden')" v-on:mouseleave="setToggle">
            <div class="max-h-[20rem] p-4 overflow-y-auto">
                <div v-for="(item, index) in cartProducts.items" :class="'flex flex-col items-center bg-white mt-5 md:flex-row md:max-w-xl hover:bg-gray-100' + (indicator ? ' pointer-events-none opacity-50' : '')">
                    <img class="object-cover max-w-[30rem]  h-32 " src="https://picsum.photos/200/300" alt="">
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2" :title="item.product.PRODUCTO + ' | ' + item.product.Descripcion">{{ item.product.PRODUCTO + ' | ' + item.product.Descripcion }}</h5>
                    <fwb-badge size="sm" type="green" class="w-20">
                    <template #icon>
                        <svg class="w-3 h-3 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"/>
                    </svg>
                    </template>
                    {{ item.subtotal }} 
                    </fwb-badge>
                    </div>
                    <div class="relative flex max-w-[8rem]">
                        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" @click="substract(item.product, 1)" :disabled="item.quantity == 1">
                            <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" v-model="item.quantity" disabled>
                        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"  @click="add(item.product, 1)">
                            <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div v-show="cartProducts.totalItems == 0" class="items-center bg-white">
                    <EmptyCart/>
                </div>

            </div>
            <div class="grid grid-cols-2 gap-4 p-4 items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <div>
                    <a href="/cart" :class="'block w-full rounded bg-default text-white p-3 text-sm font-medium transition hover:scale-105 text-center ' + (cartProducts.totalItems > 0 && !indicator ? '' : 'pointer-events-none opacity-50')">
                        Ver carrito
                    </a>
                </div>
                <div :title="(!session && 'Inicia sesión para pagar')">
                    <a href="/checkout" :class="'block w-full rounded bg-default text-white p-3 text-sm font-medium transition hover:scale-105 text-center ' + (cartProducts.totalItems > 0 && !indicator && session ? '' : 'pointer-events-none opacity-50')">
                        Pagar
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>