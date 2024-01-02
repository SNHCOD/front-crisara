<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, computed  } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import LoginUseCase from '@/useCases/LoginUseCase';
import { useSessionStore } from '@/store/services/sessionStore';
import { FwbModal } from 'flowbite-vue';

// Importar componentes
import AppLayout from '@/components/layout/AppLayout.vue';
import Tabs from '@/components/UI/Tabs.vue';
import { FwbInput, FwbCheckbox   } from 'flowbite-vue'

// Definición de datos
  // Datos de comportamiento
  const router = useRouter()
  const path = window.location.href.split('=');
  const selectedTab = path[1];
  const tabs = [
    {
      name: 'Iniciar sesión',
      url: '/auth/?t=0'
    }, 
    {
      name: 'Registrarme',
      url: '/auth/?t=1'
    }
  ];
  const modalShow = ref(false);

  // Datos de persistencia
  const { login, clearSession, saveSession, loadSession, getSession } = useSessionStore();

  // Datos manipulables del componente
  const form = ref({
    email: '',
    password: '',
  });

  const rules = computed(() => {
    return {
      email: { 
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
      handleLogin();
    }
  };

// Definición de ciclo de vida
onMounted(() => {
})

// Definición de métodos
const handleLogin = async () => {
  await LoginUseCase.execute(form.value)
    .then(response => {      
      const data = response.data;
      login(data);
      router.push({ path: '/' })
    })
    .catch(error => {
      modalShow.value = true;
    })

};

function closeModal () {
  modalShow.value = false
}
</script>

<template>
  <AppLayout> 
    <fwb-modal v-if="modalShow" @close="closeModal">
      <template #body>        
        <svg class="mx-auto mb-4 text-red-500 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <p class="text-base text-center leading-relaxed text-gray-900">
          Dato de acceso incorrectos
        </p>
      </template>
    </fwb-modal>
    <div class="w-2/3 mx-auto pt-5">
      <Tabs :selectedTab="selectedTab" :tabs="tabs" /> 
      <section v-show="selectedTab == 0" class="bg-white">
          <div class="px-4 mx-auto max-w-screen-xl grid lg:grid-cols-2 gap-8 lg:gap-16 my-10">
              <div class="flex flex-col justify-center">
                  <h1 class="mb-4 text-3xl font-semibold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">Inicar sesión en Crisara</h1>
              </div>               
              <form @submit.prevent="submitForm">
                <div class="w-full lg:max-w-xl px-6 space-y-8 sm:px-8 bg-white rounded-lg ">
                  <fwb-input v-model="form.email" label="Correo" placeholder="correo@ejemplo.com" class="w-full"/>
                  <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                    {{ error.$message }}
                  </span>
                  <fwb-input v-model="form.password" type="password" label="Contraseña" class="w-full"/>
                  <span class="text-xs text-red-500" v-for="error in v$.password.$errors" :key="error.uid">
                    {{ error.$message }}
                  </span>
                  <div class="flex items-start">
                      <div class="hidden items-center h-5">
                        <fwb-checkbox disabled v-model="check" label="Recuerda mis datos" />
                      </div>
                      <a href="#" class="ms-auto text-sm font-medium text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">Ingresar</button>
                  <div class="text-sm font-medium text-gray-900">
                    ¿Aun no tienes cuenta? <a class="text-blue-600 hover:underline">Registrate aquí</a>
                  </div>
                </div>
              </form>
          </div>
      </section>
      <section v-show="selectedTab == 1" class="bg-white mb-14">
          <div class=" px-4 mx-auto max-w-screen-xl  grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div>
                  <div class="w-full lg:max-w-xl px-6 space-y-8 sm:px-8 bg-white rounded-lg ">
                      <form class="mt-8 space-y-6" action="#">
                        <fwb-input v-model="name" label="Nombre" placeholder="Jhon" class="w-full"/>
                        <fwb-input v-model="name" label="Apellidos" placeholder="" class="w-full"/>
                        <fwb-input v-model="name" type="date" label="Fecha de nacimiento" class="w-full"/>
                        <fwb-input v-model="name" label="Correo" placeholder="correo@ejemplo.com" class="w-full"/>
                        <fwb-input v-model="name" type="password" label="Contraseña" class="w-full"/>
                        <fwb-input v-model="name" type="password" label="Confirmar contraseña" class="w-full"/>
                          <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">Registrarme</button>
                          <div class="text-sm font-medium text-gray-900">
                            Ya tienes cuenta? <a class="text-blue-600 hover:underline">Ingresa aquí</a>
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
