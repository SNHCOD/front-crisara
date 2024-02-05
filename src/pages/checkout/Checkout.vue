<script setup>
// Importar funcionalidades | utilidades
import { loadScript } from '@paypal/paypal-js'
import { ref, computed, onMounted } from 'vue';
import { useSessionStore } from '@/store/services/sessionStore';
import { useCartStore } from '@/store/services/cartStore';
import { useSettingsStore } from '@/store/services/settingsStore';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, numeric, helpers } from '@vuelidate/validators';
import PaymentService from '@/services/PaymentService';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Importar componentes
import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel,
} from 'flowbite-vue'
import Spinner from '@/components/UI/Spinner.vue';

// Definición de datos
const processingPayment = ref(false);
const verifiedPayment = ref(false);

const { getCBPaqueterias } = useSettingsStore();
const conf = getCBPaqueterias();
const paqueterias = ref([]);

const shipping = ref(0);
const { getUserdata, getPaymentData } = useSessionStore();
const customer = getUserdata();
const paymentData = getPaymentData();
const { getCartProducts, replaceCart } = useCartStore();
const cartProducts = ref(getCartProducts());
// Change to your CLIENT ID gotten from the developer dashboard
const CLIENT_ID = 'AfoHXwffEoVH1qESidmB51J2xgT8dtRxF044SB1lBKM3Tj-aD5vCBBUTN_00-LLyFvV-RV9T0e39QZZ_'
const CURRENCY = 'MXN'
const toast = useToast();

const finalAmount = computed(() => {
  return parseFloat(parseFloat(cartProducts.value.total) + parseInt(shipping.value)).toFixed(2);
});
  // Datos manipulables del componente
  const form = ref({
    email: customer.billing.Correo,
    fullname: customer.data.RazonSocial,
    cardNumber: '4555513723441831',
    month: '11',
    year: '27',
    cvc: '123',
    address: customer.billing.domicilio_fiscal,
    state: customer.data.estado,
    cp: customer.billing.cp,
  });

  const rules = computed(() => {
    return {
        email: { 
            email: helpers.withMessage('Debe ser correo', email), 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Dato muy corto', minLength(4)) 
        },
        fullname: { 
            required: helpers.withMessage('Requerido', required)
        },
        cardNumber: { 
            numeric: helpers.withMessage('Debe ser número de tarjeta', numeric), 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Debe ser número de tarjeta', minLength(12)) 
        },
        month: { 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Debe ser mes', minLength(2)) 
        },
        year: { 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Debe ser año', minLength(2)) 
        },
        cvc: { 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Debe ser CVC', minLength(3)) 
        },
        address: { 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Debe ser dirección', minLength(10)) 
        },
        state: { 
            required: helpers.withMessage('Requerido', required)
        },
        cp: { 
            numeric: helpers.withMessage('Debe ser código postal', numeric), 
            required: helpers.withMessage('Requerido', required),
            minLength: helpers.withMessage('Debe ser código postal', minLength(5)) 
        },
    }
  });
  
  const v$ = useVuelidate(rules, form);

  const submitForm = async () => {
    const result = await v$.value.$validate();
    if(result) {
        processingPayment.value = true;
        createToken();
    }
  };

onMounted(() => {
    loadScript({ 'client-id': CLIENT_ID, 'currency': CURRENCY }).then((paypal) => {
        paypal.Buttons({
            createOrder: createOrder,
            onApprove: onApprove,
            fundingSource: paypal.FUNDING.PAYPAL
        })
        .render('#paypal-button-container')
    })
    loadConekta();
    paqueterias.value = JSON.parse(conf.content);
})

const createOrder = (data, actions) => {
    return actions.order.create({
    purchase_units: [
        {
        amount: {
            value: finalAmount.value,
        },
        },
    ],
    })
}

const onApprove = async (data, actions) => {
    const localForm = form.value;
    let items = [];
    cartProducts.value.items.forEach(item => {
        items.push(
            {
                "name": item.product.PRODUCTO + " | " + item.product.Descripcion,
                "unit_price": parseInt(parseFloat(item.product.PrecioWeb) * 100),
                "quantity": item.quantity
            }
        );
    });

    const body = {
        "idUser": paymentData.id,
        "idToken": paymentData.token,
        "status": 3,
        "name": localForm.fullname,
        "email": localForm.email,
        "shipping": parseInt(parseFloat(shipping.value) * 100),
        "shoppin_cart_id": cartProducts.value.id,
        "items": items
    };

    await PaymentService.save(body)
    .then(response => {      
        replaceCart(response.data);
        processingPayment.value = false;
        verifiedPayment.value = true;
    })
    .catch(error => {
        processingPayment.value = false;
        toast.error('Hubo un problema');
    })
    await new Promise(resolve => setTimeout(() => {
      if(verifiedPayment.value) {
        window.location.href = "/";
      }
      resolve();
    }, 5000));
}

const loadConekta = () => {
  const script = document.createElement('script')
  script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
  script.async = true
  document.body.appendChild(script)
}

const createToken = () => {
    const localForm = form.value;
    //window.Conekta.setPublicKey('key_uv5lTGQopj50xwdAd72GSeN')
    window.Conekta.setPublicKey('key_PzO12ZsX5lyoOQyUoYiKces')
    const tokenParams = {
      card: {
        number: localForm.cardNumber,
        name: localForm.fullname,
        exp_year: localForm.year,
        exp_month: localForm.month,
        cvc: localForm.cvc
      }
    }
    window.Conekta.Token.create(tokenParams, token => submitPayment(token), error => {toast.error(error)})
}

const submitPayment = async(token) => {
    const localForm = form.value;
    let items = [];
    cartProducts.value.items.forEach(item => {
        items.push(
            {
                "name": item.product.PRODUCTO + " | " + item.product.Descripcion,
                "unit_price": parseInt(parseFloat(item.product.PrecioWeb) * 100),
                "quantity": item.quantity
            }
        );
    });

    const body = {
        "idUser": paymentData.id,
        "idToken": paymentData.token,
        "status": 4,
        "name": localForm.fullname,
        "email": localForm.email,
        "token_id": token.id,
        "shipping": parseInt(parseFloat(shipping.value) * 100),
        "shoppin_cart_id": cartProducts.value.id,
        "items": items
    };

    await PaymentService.pay(body)
    .then(response => {      
        replaceCart(response.data);
        processingPayment.value = false;
        verifiedPayment.value = true;
    })
    .catch(error => {
        processingPayment.value = false;
        toast.error('Hubo un problema');
    })
    await new Promise(resolve => setTimeout(() => {
      if(verifiedPayment.value) {
        window.location.href = "/";
      }
      resolve();
    }, 5000));
}

</script>

<template>
    <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="/" class="text-2xl font-bold text-default">crisara</a>
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div class="relative">
                <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                    <li class="flex items-center space-x-3 text-left sm:space-x-4">
                        <a class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                            href="#"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-default" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </a>
                        <span class="font-semibold text-gray-900">Elección de productos</span>
                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <li class="flex items-center space-x-3 text-left sm:space-x-4">
                        <div v-if="!verifiedPayment" >
                            <a :class='"flex h-6 w-6 items-center justify-center rounded-full bg-default text-xs font-semibold text-white ring ring-default ring-offset-2" + (!processingPayment ? " animate-bounce" : "")'>
                                2
                            </a>
                        </div>
                        <a v-else class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-default" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </a>
                        <span class="font-semibold text-gray-900">Pago</span>
                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <li class="flex items-center space-x-3 text-left sm:space-x-4">
                        <a v-if="!verifiedPayment" :class='"flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white" + (processingPayment ? " bg-default ring ring-default ring-offset-2 animate-bounce" : " bg-gray-400")'>
                            3
                        </a>
                        <a v-else class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-default" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </a>
                        <span class="font-semibold text-gray-500">{{ !processingPayment ? 'Listo' : 'Procesando'}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8 my-5">
            <p class="text-xl font-medium">Resumen de compra</p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 max-h-[25rem] overflow-y-auto">
                <div v-for="(item, index) in cartProducts.items" class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src="https://picsum.photos/200/300" alt="foto de producto" />
                    <div class="flex w-full flex-col px-4 py-4 overflow-x-hidden" :title='item.product.PRODUCTO + " | " + item.product.Descripcion'>
                        <span class="font-semibold truncate">{{ item.product.PRODUCTO + ' | ' + item.product.Descripcion }}</span>
                        <span class="float-right text-gray-400">{{ item.product.UnidadVenta + ': ' + item.quantity }}</span>
                        <p class="text-lg font-bold">$ {{ parseFloat(parseFloat(item.product.PrecioWeb) * parseInt(item.quantity)).toFixed(2) }}</p>
                    </div>
                </div>
            </div>
            <p class="mt-8 text-lg font-medium">Formas de entrega</p>
            <div :class='"mt-5 grid gap-6" + (verifiedPayment ? " pointer-events-none opacity-50 cursor-not-allowed" : "")'>
                <fwb-accordion :openFirstItem="false">
                    <fwb-accordion-panel class="border-b rounded-lg">
                        <fwb-accordion-header>
                            <span class="text-lg text-black">Retiro</span>
                        </fwb-accordion-header>
                        <fwb-accordion-content>
                            <div class="h-56 overflow-y-scroll">
                                <div v-for="(paqueteria, index) in paqueterias" :key="index" class="relative max-w-[46rem] my-3" :title="paqueteria.name">
                                    <input class="peer hidden" :id='"radio_" + (index + 2)' type="radio" name="radio" value="35" v-model="shipping"/>
                                    <span
                                        class="peer-checked:border-default absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label
                                        class="peer-checked:border-2 peer-checked:border-default peer-checked:bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                        :for='"radio_" + (index + 2)'>
                                        <div class="ml-5 overflow-hidden max-w-[40rem]">
                                            <span class="mt-2 truncate">
                                                {{ paqueteria.name }}
                                            </span>
                                            <p class="mt-2 text-sm">
                                                {{ paqueteria.hours }}
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </fwb-accordion-content>
                    </fwb-accordion-panel>
                </fwb-accordion>
                <div class="relative">
                    <input class="peer hidden" id="radio_1" type="radio" name="radio" value="0" v-model="shipping"/>
                    <span
                        class="peer-checked:border-default absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-default peer-checked:bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_1">
                        <!--img class="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" /-->
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Envío</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div v-if="!verifiedPayment" class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">Pagar con PayPal</p>
            <div id="paypal-button-container" class="mx-auto w-2/3 pt-5">
            </div>
            <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 ">o</span>
                <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <p class="text-xl font-medium">Tarjeta DB/CT</p>
            <p class="text-gray-600">Completa tu compra ingresando tu Información de pago.</p>
            <form @submit.prevent="submitForm">
                <label for="email" class="mt-4 mb-2 block text-sm font-medium">Correo</label>
                <div class="relative">
                    <input type="text" id="email" name="email" v-model="form.email"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                        placeholder="ejemplo@correo.com" />
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                </div>
                <span class="text-xs text-red-500 animate-bounce" v-for="error in v$.email.$errors" :key="error.uid">
                {{ error.$message }}
                </span>
                <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Nombre completo</label>
                <div class="relative">
                    <input type="text" id="card-holder" name="card-holder" v-model="form.fullname"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                        placeholder="Como aparece en la tarjeta" />
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                    </div>
                </div>
                <span class="text-xs text-red-500" v-for="error in v$.fullname.$errors" :key="error.uid">
                {{ error.$message }}
                </span>
                <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">Información de la tarjeta</label>
                <div class="flex">
                    <div class="relative w-7/12 flex-shrink-0">
                        <input type="text" id="card-no" name="card-no"  v-model="form.cardNumber"
                            class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                            placeholder="1234-0000-0000-0000" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                <path
                                    d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                            </svg>
                        </div>
                    </div>
                    <input type="text" name="credit-expiry" v-model="form.month"
                        class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                        placeholder="MM" maxlength="2" minlength="2" />
                    <input type="text" name="credit-expiry" v-model="form.year"
                        class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                        placeholder="YY" maxlength="2" minlength="2" />
                    <input type="text" name="credit-cvc" v-model="form.cvc"
                        class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                        placeholder="CVC" maxlength="3" minlength="3" />
                </div>
                <div class="grid grid-cols-5">
                    <div class="col-span-2">
                        <span class="text-xs text-red-500" v-for="error in v$.cardNumber.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <span class="text-xs text-red-500 ms-36" v-for="error in v$.month.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <span class="text-xs text-red-500 ms-24" v-for="error in v$.year.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <span class="text-xs text-red-500 ms-8" v-for="error in v$.cvc.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                </div>
                <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Dirección de facturación</label>
                <div class="flex flex-col sm:flex-row">
                    <div class="relative flex-shrink-0 sm:w-7/12">
                        <input type="text" id="billing-address" name="billing-address" v-model="form.address"
                        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default"
                        placeholder="Dirección" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg class="h-4 w-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z"/>
                                </g>
                            </svg>
                        </div>
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    </div>
                </div>
                <input type="text" name="billing-zip" v-model="form.cp"
                    class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-default focus:ring-default"
                    placeholder="CP"/>
                <select type="text" name="billing-state" v-model="form.state"
                    class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-default focus:ring-default">
                    <option value="14">Estado</option>
                </select>
                </div>
                <div class="grid grid-cols-5">
                    <div class="col-span-3">
                        <span class="text-xs text-red-500" v-for="error in v$.address.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <span class="text-xs text-red-500" v-for="error in v$.cp.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                    <div>
                        <span class="text-xs text-red-500 ms-8" v-for="error in v$.state.$errors" :key="error.uid">
                        {{ error.$message }}
                        </span>
                    </div>
                </div>
                <!-- Total -->
                <div class="mt-6 border-t border-b py-2">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Subtotal</p>
                        <p class="font-semibold text-gray-900">${{ parseFloat(cartProducts.total).toFixed(2) }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Envío</p>
                        <p class="font-semibold text-gray-900">${{ parseFloat(shipping).toFixed(2) }}</p>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Total</p>
                    <p class="text-2xl font-semibold text-gray-900">${{ finalAmount }}</p>
                </div>
                <button type="submit" :class='"mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium text-white " + (verifiedPayment ? "bg-success" : "bg-default")' :disabled="processingPayment || verifiedPayment">
                    <Spinner v-show="processingPayment" />
                    <span v-show="!processingPayment">
                        {{ verifiedPayment ? 'Correcto' : 'Pagar' }}
                    </span>
                </button>
            </form>
        </div>
        <div v-else class="mt-10 px-4 pt-8 lg:mt-0 flex flex-row gap-8 mx-auto place-items-center">
            <svg class="mt-1 w-[100px] h-[100px] text-success animate-bounce" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd"/>
            </svg>
            <h2 class="font-semibold text-5xl">
                Pago realizado
            </h2>
        </div>
    </div>
</template>