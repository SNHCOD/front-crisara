<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted  } from 'vue'
import { useCartStore } from '@/store/services/cartStore';
import { useSessionStore } from '@/store/services/sessionStore';
import CustomerService from '@/services/CustomerService';

// Importar componentes
import AppLayout from '../../components/layout/AppLayout.vue';
import { FwbBadge } from 'flowbite-vue'
import Spinner from '@/components/UI/Spinner.vue';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Definición de datos
const { logged } = useSessionStore();
const session = logged();
const indicator = ref(false);
const cuppon = ref('');
const { addToCart, increaseQuantity, removeFromCart, replaceCart, getCartProducts } = useCartStore();
const cartProducts = ref(getCartProducts());
const toast = useToast();

// Definición de ciclo de vida
// Lógica de escucha de eventos en el componente
onMounted(() => {
  window.addEventListener('localstorage-changed', (event) => {
    console.log('change');
    cartProducts.value = getCartProducts();
  });
});

// Definición de métodos
const add = async (product, quantity, rep = false) => {
    if(quantity < 1) {
      toast.error('Debes tener mínimo 1 producto');
      await new Promise(resolve => setTimeout(() => {
        window.location.href = "/cart";
        resolve();
      }, 500));
    }
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
    if(rep) body.rep = rep;
    await CustomerService.updateShoppingCartItems(body)
    .then(response => {      
      const data = response.data;
      replaceCart(data);
      cartProducts.value = getCartProducts();
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
      replaceCart(data);
      cartProducts.value = getCartProducts();
      indicator.value = false;
    })
    .catch(error => {
        indicator.value = false;
        return;
    })
}

const destroy = async (id) => {
    indicator.value = true;
    const body = {
        "id": id
    };
    console.log(body);
    await CustomerService.destroyShoppingCartItem(body)
    .then(response => {      
      const data = response.data;
      replaceCart(data);
      cartProducts.value = getCartProducts();
      indicator.value = false;
    })
    .catch(error => {
        indicator.value = false;
        return;
    })
}

const applyCuppon = async () => {
    indicator.value = true;
    await CustomerService.applyCuppon(cuppon.value, cartProducts.value.id)
    .then(response => {      
      const data = response.data;
      replaceCart(data);
      cartProducts.value = getCartProducts();
      indicator.value = false;
    })
    .catch(error => {
        indicator.value = false;
        return;
    })
}

</script>

<template>
  <AppLayout>
    <div class="w-11/12 md:w-2/3 mx-auto pt-5 mb-20">
      <h2 class="text-2xl text-default font-semibold">
        Mi carrito
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="col-span-2 pt-6 pl-6 pr-6 pb-2 bg-white border border-gray-200 rounded-lg shadow max-h-[60vh] overflow-y-auto">
          <div class="grid row-auto divide-gray-300 divide-y-0 md:divide-y gap-5">
            <div class="grid-cols-7 hidden md:grid">
              <div class="col-span-4">
                <p>
                  Producto
                </p>
              </div>
              <div class="col-span-2 mx-auto">
                <p>
                  Cantidad
                </p>
              </div>
              <div class="mx-auto">
                <p>
                  Total
                </p>
              </div>
            </div>
            <div v-for="(item, index) in cartProducts.items" class="grid grid-cols-7 md:pt-4">
              <div class="col-span-7 md:col-span-4">
                <div class="grid grid-rows-2 grid-flow-col gap-2">
                  <button type="button" class="text-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center w-10 h-10" @click="destroy(item.id)">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                    </svg>
                  <span class="sr-only">Icon description</span>
                  </button>
                  <div class="row-span-3">
                    <img src="https://picsum.photos/200/300" alt="foto de producto" class="min-w-[6rem] w-24 h-24">
                  </div>
                  <div class="overflow-hidden" :title="item.product.Descripcion">
                    <p class="text-base mt-2 truncate">
                      {{ item.product.Descripcion }}
                    </p>
                  </div>
                  <div class="flex flex-row max-h-6">
                    <p class="text-sm px-2.5 py-0.5">
                      Subtotal
                    </p>
                    <p class="bg-green-100 text-green-800 text-xs font-medium mt-0.5 me-2 px-1.5 py-0.5 rounded max-w-fit">
                      $ {{ parseFloat(item.price * item.quantity).toFixed(2) }}
                    </p>
                    <p class="text-sm px-2.5 py-0.5">
                      Descuento
                    </p>
                    <p class="bg-red-100 text-red-800 text-xs font-medium mt-0.5 me-2 px-1.5 py-0.5 rounded max-w-fit">
                      $ {{ parseFloat(item.ImpDescuento).toFixed(2) }}
                    </p>
                  </div>
                </div>
              </div>
              <div :class="'col-span-3 md:col-span-2 mx-auto ' + (indicator ? 'pointer-events-none opacity-50 cursor-not-allowed' : '')">
                  <div class="relative flex max-w-[8rem]">
                      <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" @click="substract(item.product, 1)" :disabled="item.quantity == 1">
                          <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                          </svg>
                      </button>
                      <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-pink-500 focus:border-pink-500 block w-full py-2.5" min="1" v-model="item.quantity" v-on:change="add(item.product, item.quantity, true)">
                      <button type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none" @click="add(item.product, 1)">
                          <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                          </svg>
                      </button>
                  </div>
              </div>
              <div class="col-span-3 md:col-span-1">
                <fwb-badge size="md" type="green" class="mx-auto mt-2">
                  <template #icon>
                    <svg class="w-3 h-3 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"/>
                  </svg>
                  </template>
                    {{ item.subtotal }}
                </fwb-badge>
              </div>
            </div>
          </div>
        </div>
        <div class="max-h-[60vh] p-6 bg-white border border-gray-200 rounded-lg shadow">
            <div class="grid grid-rows-5 gap-y-4 mb-5 h-96">
              <div class="flex flex-row gap-4 max-h-10">
                <input type="text" id="cuppon" name="cuppon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-default focus:border-default block w-full p-2.5" v-model="cuppon" :placeholder="cartProducts.codeDiscount" :disabled="cartProducts.codeDiscount || indicator">
                <button :class="'block w-full rounded text-white text-sm font-medium transition ' + (cartProducts.codeDiscount || indicator ? 'bg-pink-500' : 'bg-default hover:scale-105')" @click="applyCuppon" :disabled="cartProducts.codeDiscount || indicator">{{ cartProducts.codeDiscount ? 'Cupón aplicado' : 'Aplicar'}}</button>
              </div>
              <div class="grid grid-cols-3 gap-4 max-h-8">
                <h5 class="col-span-2 mb-2 text-xl tracking-tight text-gray-900">Cupón:</h5>
                <p class="text-md mt-[.06rem] me-2 px-1.5 py-0.5 rounded max-w-fit">
                  {{ cartProducts.codeDiscount ? cartProducts.codeDiscount : 'Ninguno' }}
                </p>
              </div>
              <div class="grid grid-cols-3 gap-4 max-h-8">
                <h5 class="col-span-2 mb-2 text-xl tracking-tight text-gray-900">Subtotal:</h5>
                <p class="text-md mt-[.06rem] me-2 px-1.5 py-0.5 rounded max-w-fit">
                  ${{ parseFloat(cartProducts.subtotal).toFixed(2) }}
                </p>
              </div>
              <div class="grid grid-cols-3 gap-4 max-h-8">
                <h5 class="col-span-2 mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total:</h5>
                <p class="text-lg font-medium mt-0.5 me-2 px-1.5 py-0.5 rounded max-w-fit">
                  ${{ parseFloat(cartProducts.total).toFixed(2) }}
                </p>
              </div>
              <div class="flex flex-row gap-4 max-h-8">
                <div class="flex items-center">
                    <input id="int-delivery" type="checkbox" value="" class="w-4 h-4 text-default bg-gray-100 border-gray-300 rounded focus:ring-default hover:cursor-pointer">
                    <label for="int-delivery" class="ms-2 text-sm font-medium text-gray-900 hover:cursor-pointer">Cotizar envío internacional</label>
                </div>
                <div class="flex items-center">
                    <input id="road-delivery" type="checkbox" value="" class="w-4 h-4 text-default bg-gray-100 border-gray-300 rounded focus:ring-default hover:cursor-pointer">
                    <label for="road-delivery" class="ms-2 text-sm font-medium text-gray-900 hover:cursor-pointer">Cotizar envío terrestre</label>
                </div>
              </div>
            </div>
            <div class="place-self-end">
              <a href="/checkout" :class="'block w-full rounded text-white p-3 text-sm font-medium transition text-center bg-default ' + (indicator || cartProducts.totalItems < 1 || !session ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'hover:scale-105')">
                  <Spinner v-show="false" />
                  <span v-show="true">
                      {{ cartProducts.totalItems < 1 ? 'Agrega algunos productos' : (session ? 'Pagar' : 'Inicia sesión para pagar') }}
                  </span>
                </a>
            </div>
        </div>
      </div>  
    </div>
  </AppLayout>
</template>
