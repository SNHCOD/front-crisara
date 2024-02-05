<script setup>
// Importar funcionalidades | utilidades
import { ref, computed, onMounted  } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';
import CustomerService from '@/services/CustomerService';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Importar componentes
import AppLayout from '@/components/layout/AppLayout.vue';
import { FwbInput } from 'flowbite-vue'
import Loader from '@/components/UI/Loader.vue';
import { useRoute } from 'vue-router';

// Definición de datos
  // Datos de comportamiento
  const loading = ref(false);
  const reseted = ref(false);
  const toast = useToast();
  const route = useRoute();
  const param = route.query.p;
  const data = ref({});

  // Datos de persistencia

  // Datos manipulables del componente
  const form = ref({
    password: ''
  });

  const rules = computed(() => {
    return {
      password: { 
        required: helpers.withMessage('Correo requerido', required), 
        minLength: helpers.withMessage('Dato muy corto', minLength(4)) 
      }
    }
  });
  const v$ = useVuelidate(rules, form);

  const submitForm = async () => {
    const result = await v$.value.$validate();
    if(result) {
      loading.value = true;
      handleSendLink();
    }
  };

onMounted(async () => {
  if(!param) {
    toast.error('No autorizado', {
      timeout: 500
    });
    await new Promise(resolve => setTimeout(() => {
      window.location.href = "/auth?t=0";
      resolve();
    }, 500));
  }
  const values = atob(param);
  const array = values.split("|");
  data.value = {
    'token': array[0],
    'email': array[1]
  }
})

// Definición de métodos
const handleSendLink = async () => {
  const body = data.value;
  body.password = form.value.password;


  await CustomerService.resetPassword(body)
    .then(response => {      
      reseted.value = true;
      const data = response.data;
      loading.value = false;
      toast.success(data, {
        timeout: 2000
      });
    })
    .catch(error => {
      console.log(error);
      toast.error(error.response.data, {
        timeout: 2000
      });
      loading.value = false;
      return;
    })
    await new Promise(resolve => setTimeout(() => {
      if(reseted.value) window.location.href = "/auth?t=0";
      resolve();
    }, 2000));
};

</script>

<template>
  <AppLayout> 
    <Loader :loading="loading" />
    <div class="w-2/3 mx-auto mt-32">
      <section class="bg-white">
          <div class="px-4 mx-auto max-w-screen-xl grid lg:grid-cols-2 gap-8 lg:gap-16 my-10">
              <div class="flex flex-col justify-center">
                  <h1 class="text-3xl font-semibold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">Cambia tu contraseña</h1>
              </div>               
              <form @submit.prevent="submitForm">
                <div class="w-full lg:max-w-xl px-6  sm:px-8 bg-white rounded-lg">
                  <fwb-input  v-model="form.password" label="Contraseña" class="w-full mt-6"/>
                  <p class="text-xs text-red-500" v-for="error in v$.password.$errors" :key="error.uid">
                    {{ error.$message }}
                  </p>
                  <button type="submit" class="w-full mt-6 px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">Ingresar</button>
                </div>
              </form>
          </div>
      </section>
    </div>
  </AppLayout>
</template>
