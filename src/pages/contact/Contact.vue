<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, numeric, helpers } from '@vuelidate/validators';
import CustomerService from '@/services/CustomerService';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

import AppLayout from '../../components/layout/AppLayout.vue';
import Spinner from '@/components/UI/Spinner.vue';

// Datos
const sending = ref(false);
const sent = ref(false);
const toast = useToast();
  // Datos manipulables del componente
  const form = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const rules = computed(() => {
    return {
        name: { 
            required: helpers.withMessage('Requerido', required)
        },
        email: { 
            email: helpers.withMessage('Debe ser correo', email), 
            required: helpers.withMessage('Requerido', required)
        },
        phone: { 
            numeric: helpers.withMessage('Debe ser número de teléfono', numeric), 
            required: helpers.withMessage('Requerido', required), 
            minLength: helpers.withMessage('Debe ser número de teléfono', minLength(10)) 
        },
        subject: { 
            required: helpers.withMessage('Requerido', required)
        },
        message: { 
            required: helpers.withMessage('Requerido', required)
        }
    }
  });
  
  const v$ = useVuelidate(rules, form);

  const submitForm = async () => {
    const result = await v$.value.$validate();
    if(result) {
      sending.value = true;
      sendContact();
    }
  };

const sendContact = async() => {
    await CustomerService.contact(form.value)
    .then(response => {      
        sending.value = false;
        sent.value = true;
        toast.success('Correo envíado');
    })
    .catch(error => {
        sending.value = false;
        toast.error('Hubo un problema');
    })
    await new Promise(resolve => setTimeout(() => {
      sent.value = false;
      resolve();
    }, 5000));
}

</script>

<template>
  <AppLayout>
    <div>
      <section
      class="bg-center bg-cover bg-no-repeat bg-[url('https://www.crisarabisuteria.com/public/images/contacto.jpg')] bg-gray-500 bg-blend-multiply max-h-96">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-32">
          <h1 class="mb-4 text-4xl font-semibold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Contactanos</h1>
        </div>
      </section>
      <div class="w-2/3 mx-auto pt-5">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="mx-auto px-5">
            <h3 class="text-xl font-medium">
              ¿Tienes alguna duda?
            </h3>
            <p class="text-lg leading-loose pt-5">
              Comunicate con nosotros, te ayudamos, te asesoramos y buscamos la mejor solución para tus proyectos de bisutería, joyería e insumos.
            </p>
            <ul class="list-none pt-6 mb-10">
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                    <svg class="w-6 h-6 text-red-400 mx-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                      <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                    </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contactanos</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Fabricantes directo con la mejor experiencia para envios online
                        </p>
                    </div>
                </div>
              </li>
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                  <svg class="w-6 h-6 text-red-400 mx-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                    <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z"/>
                  </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Teléfono</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">+52 33 2646 9699</p>
                    </div>
                </div>
              </li>
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                  <svg class="w-6 h-6 text-red-400 mx-10" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Correo Electrónico</h5>
                        <a href="mailto:crisarainsumoybisuteria@gmail.com" class="mb-3 font-normal text-gray-700 dark:text-gray-400">crisarainsumoybisuteria@gmail.com</a>
                    </div>
                </div>
              </li>
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                  <svg class="w-6 h-6 text-red-400 mx-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15.133 10.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175ZM4 4a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 4 4ZM2 8H1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 16 4Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
                  </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Horario</h5>
                        <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">
                        Venta web
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Lunes a viernes 9:00 am a 6:00pm
                        </p>
                        <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">
                          Venta personalizada
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Lunes a viernes 10:00 am a 3:00pm
                        </p>
                    </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="w-2/3 ml-5 grid grid-flow-row">
            <h3 class="text-xl font-medium">
              ¿Como te podemos ayudar?
            </h3>

            <div>
              <div class="relative ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                  </svg>
                </div>
                <input v-model="form.name" type="text" id="input-group-1" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 " placeholder="Nombre completo">
              </div>
              <span class="text-xs text-red-500" v-for="error in v$.name.$errors" :key="error.uid">
              {{ error.$message }}
              </span>
            </div>

            <div>
              <div class="relative ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
                </div>
                <input v-model="form.email" type="text" id="input-group-1" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 " placeholder="Correo">
              </div>
              <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
              {{ error.$message }}
              </span>
            </div>

            <div>
              <div class="relative ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                    <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z"/>
                  </svg>
                </div>
                <input v-model="form.phone" type="text" id="input-group-1" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 " placeholder="Teléfono">
              </div>
              <span class="text-xs text-red-500" v-for="error in v$.phone.$errors" :key="error.uid">
              {{ error.$message }}
              </span>
            </div>

            <div>
              <div class="relative ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                </div>
                <input v-model="form.subject" type="text" id="input-group-1" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 " placeholder="Asunto">
              </div>
              <span class="text-xs text-red-500" v-for="error in v$.subject.$errors" :key="error.uid">
              {{ error.$message }}
              </span>
            </div>

            <div>
              <textarea 
                id="message" 
                rows="4" 
                class=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500" 
                placeholder="Mensaje"
                v-model="form.message">
              </textarea>
              <p class="text-xs text-red-500" v-for="error in v$.message.$errors" :key="error.uid">
              {{ error.$message }}
              </p>
            </div>

            <div>
              <button @click="submitForm" :class='"mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium text-white " + (sent ? "bg-success" : "bg-default")' :disabled="sending || sent">
                    <Spinner v-if="sending" />
                    <span v-else>
                        {{ sent ? 'Enviado' : 'Enviar mensaje' }}
                    </span>
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
