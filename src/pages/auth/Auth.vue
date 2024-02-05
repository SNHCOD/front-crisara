<script setup>
// Importar funcionalidades | utilidades
import { ref, computed  } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs, email, helpers, minValue } from '@vuelidate/validators';
import CustomerService from '@/services/CustomerService';
import { useSessionStore } from '@/store/services/sessionStore';
import { useCartStore } from '@/store/services/cartStore';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Importar componentes
import AppLayout from '@/components/layout/AppLayout.vue';
import Tabs from '@/components/UI/Tabs.vue';
import { FwbInput, FwbCheckbox   } from 'flowbite-vue'
import Loader from '@/components/UI/Loader.vue';

// Definición de datos
  // Datos de comportamiento
  const path = window.location.href.split('=');
  const selectedTab = path[1];
  const tabs = [
    {
      name: 'Iniciar sesión',
      url: '/auth?t=0'
    }, 
    {
      name: 'Registrarme',
      url: '/auth?t=1'
    }
  ];
  const loading = ref(false);
  const logged = ref(false);
  const toast = useToast();

  // Datos de persistencia
  const date = new Date();
  date.setFullYear( date.getFullYear() - 18 );
  const cart = useCartStore();
  const { login } = useSessionStore();

// Datos manipulables del componente

  // Login
    const form = ref({
      login: '',
      password: '',
    });

    const rules = computed(() => {
      return {
        login: { 
          required: helpers.withMessage('Correo o id requerido', required), 
          minLength: helpers.withMessage('Dato muy corto', minLength(4)) 
        },
        password: { 
          required: helpers.withMessage('Contraseña requerida', required), 
          minLength: helpers.withMessage('Dato muy corto', minLength(6)) 
        },
      }
    });
    const v$ = useVuelidate(rules, form);

    const submitForm = async () => {
      const result = await v$.value.$validate();
      if(result) {
        loading.value = true;
        handleLogin();
      }
    };
  //

  // Register
    const register = ref({
      RazonSocial: '',
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      Correo: '',
      FechaNacimiento: date,
      Contrasena: '',
      confirmPassword: '',
    });

    const rulesRegister = computed(() => {
      return {
        RazonSocial: { 
          required: helpers.withMessage('Nombre requerido', required)
        },
        ApellidoPaterno: { 
          required: helpers.withMessage('Apellido paterno requerido', required)
        },
        ApellidoMaterno: { 
          required: helpers.withMessage('Apellido materno requerido', required)
        },
        Correo: { 
          required: helpers.withMessage('Correo requerido', required), 
          email: helpers.withMessage('Debe ser correo', email) 
        },
        FechaNacimiento: { 
          required: helpers.withMessage('Fecha de nacimiento requerida', required), 
          minValue: helpers.withMessage('Debes ser mayor de 18 años', value => {
                    console.log(value)
                    return new Date(value) < date
                }),   
        },
        Contrasena: { 
          required: helpers.withMessage('Contraseña requerida', required), 
          minLength: helpers.withMessage('Muy corta', minLength(6)) 
        },
        confirmPassword: { 
          required: helpers.withMessage('No coincide', required), 
          sameAsRef:  helpers.withMessage('No coincide', sameAs(register.value.Contrasena)), 
        },
      }
    });
    const v2$ = useVuelidate(rulesRegister, register);

    const submitFormRegister = async () => {
      const result = await v2$.value.$validate();
      if(result) {
        loading.value = true;
        handleRegister();
      }
    };
  //

// Definición de métodos
const handleLogin = async () => {
  await CustomerService.login(form.value)
    .then(response => {      
      const data = response.data;
      if(!data.customer.shipping) {
        data.customer.shipping = {
          rfc: '',
          colonia: '',
          codigoPostal: '',
          domicilio: '',
          entreCalles: '',
          EstadoID: '',
          MunicipioID: '',
          numeroExterior: '',
          numeroInterior: '',
          NombreReceptor: '',
          PaisID: ''
        };
      }
      login(data);
      cart.replaceCart(data.customer.cart);
      loading.value = false;
      logged.value = true;
      toast.success('Bienvenido', {
        timeout: 2000
      });
    })
    .catch(error => {
      toast.error(error.response.data.error, {
        timeout: 2000
      });
      loading.value = false;
      return;
    })
    await new Promise(resolve => setTimeout(() => {
      if(logged.value) {
        window.location.href = "/profile";
      }
      resolve();
    }, 2000));
};

const handleRegister = async () => {
  form.value = {
      login: register.value.Correo,
      password: register.value.Contrasena,
    };
  register.value.NombreComercial = register.value.RazonSocial + ' ' + register.value.ApellidoPaterno + ' ' + register.value.ApellidoMaterno
  await CustomerService.register(register.value)
    .then(response => {   
      handleLogin();   
    })
    .catch(error => {
      toast.error('Error al registrarte', {
        timeout: 2000
      });
      loading.value = false;
      return;
    })

};

</script>

<template>
  <AppLayout> 
    <Loader :loading="loading" />
    <div class="w-2/3 mx-auto pt-5">
      <Tabs :selectedTab="selectedTab" :tabs="tabs" /> 
      <section v-show="selectedTab == 0" class="bg-white">
          <div class="px-4 mx-auto max-w-screen-xl grid lg:grid-cols-2 gap-8 lg:gap-16 my-10">
              <div class="flex flex-col justify-center">
                  <h1 class="mb-4 text-3xl font-semibold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">Inicar sesión en Crisara</h1>
              </div>               
              <form @submit.prevent="submitForm">
                <div class="w-full lg:max-w-xl px-6 space-y-8 sm:px-8 bg-white rounded-lg mb-1">
                  <fwb-input v-model="form.login" label="Correo" placeholder="correo@ejemplo.com" class="w-full"/>
                  <span class="text-xs text-red-500" v-for="error in v$.login.$errors" :key="error.uid">
                    {{ error.$message }}
                  </span>
                  <fwb-input v-model="form.password" type="password" label="Contraseña" class="w-full"/>
                  <span class="text-xs text-red-500" v-for="error in v$.password.$errors" :key="error.uid">
                    {{ error.$message }}
                  </span>
                  <div class="flex items-start">
                      <a href="/forgetPassword" class="ms-auto text-sm font-medium text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto" :disabled="loading && !logged">Ingresar</button>
                  <div class="text-sm font-medium text-gray-900">
                    ¿Aun no tienes cuenta? <a class="text-blue-600 hover:underline" href="/auth?t=1">Registrate aquí </a>y disfruta de los beneficios de Mundo Crisara
                  </div>
                </div>
              </form>
          </div>
      </section>
      <section v-show="selectedTab == 1" class="bg-white mb-14">
          <div class=" px-4 mx-auto max-w-screen-xl  grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div>
                  <div class="w-full lg:max-w-xl px-6 space-y-8 sm:px-8 bg-white rounded-lg ">
                      <form class="mt-8 space-y-6" @submit.prevent="submitFormRegister" >
                        <div>
                          <fwb-input v-model="register.RazonSocial" label="Nombre" class="w-full"/> 
                          <span class="text-xs text-red-500" v-for="error in v2$.RazonSocial.$errors" :key="error.uid">
                              {{ error.$message }}
                          </span>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <fwb-input v-model="register.ApellidoPaterno" label="Apellidos" placeholder="" class="w-full"/> 
                            <span class="text-xs text-red-500" v-for="error in v2$.ApellidoPaterno.$errors" :key="error.uid">
                                {{ error.$message }}
                            </span>
                          </div>
                          <div class="mt-7">
                            <fwb-input v-model="register.ApellidoMaterno" placeholder="" class="w-full"/> 
                            <span class="text-xs text-red-500" v-for="error in v2$.ApellidoMaterno.$errors" :key="error.uid">
                                {{ error.$message }}
                            </span>
                          </div>
                        </div>
                        <div>
                          <fwb-input v-model="register.FechaNacimiento" type="date" label="Fecha de nacimiento" class="w-full"/> 
                          <span class="text-xs text-red-500" v-for="error in v2$.FechaNacimiento.$errors" :key="error.uid">
                              {{ error.$message }}
                          </span>
                        </div>
                        <div>
                          <fwb-input v-model="register.Correo" label="Correo" placeholder="correo@ejemplo.com" class="w-full"/> 
                          <span class="text-xs text-red-500" v-for="error in v2$.Correo.$errors" :key="error.uid">
                              {{ error.$message }}
                          </span>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <fwb-input v-model="register.Contrasena" type="password" label="Contraseña" class="w-full"/> 
                            <span class="text-xs text-red-500" v-for="error in v2$.Contrasena.$errors" :key="error.uid">
                                {{ error.$message }}
                            </span>
                          </div>
                          <div>
                            <fwb-input v-model="register.confirmPassword" type="password" label="Confirmar" class="w-full"/> 
                            <span class="text-xs text-red-500" v-for="error in v2$.confirmPassword.$errors" :key="error.uid">
                                {{ error.$message }}
                            </span>
                          </div>
                        </div>
                        <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">Registrarme</button>
                          <div class="text-sm font-medium text-gray-900">
                            Ya tienes cuenta? <a class="text-blue-600 hover:underline" href="/auth?t=0">Ingresa aquí</a>
                          </div>
                      </form>
                  </div>
              </div>
              <div class="flex flex-col justify-center">
                  <h1 class="mb-4 text-3xl font-semibold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">Registrate en Crisara</h1>
              </div>
          </div>
      </section>
    </div>
  </AppLayout>
</template>
