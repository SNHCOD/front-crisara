<script setup>
// Importar funcionalidades | utilidades
import { ref, watch } from 'vue';
import CustomerService from '@/services/CustomerService';
import { useSessionStore } from '@/store/services/sessionStore';
// Importar componentes
import { FwbInput, FwbSelect } from 'flowbite-vue'
import { useToast } from "vue-toastification";
import Loader from '@/components/UI/Loader.vue';

// Definición de datos
// Datos de comportamiento
const { login } = useSessionStore();
const loading = ref(false);
const change = ref(false);
const toast = useToast();

// Datos de persistencia
const { customer, cats, token } = defineProps(['customer', 'cats', 'token']);
const countries = cats.countries;
const states = cats.states;
const masterMun = cats.municipalities;

// Datos manipulables del componente
const user = ref(customer);
const municipalities = ref(user.value.EstadoID ? masterMun.filter(municipality => municipality.state == user.value.EstadoID) : masterMun);

// Definición de métodos
watch(user.value, () => {
    change.value = true;
    municipalities.value = masterMun.filter(municipality => municipality.state == user.value.EstadoID);
})

const handleLogin = async () => {
    user.value.token = token;
    loading.value = true;
    await CustomerService.update(user.value)
        .then(response => {
            const data = response.data;
            if (!data.customer.shipping) {
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
            toast.success('Datos actualizados', {
                timeout: 2000
            });
        })
        .catch(error => {
            toast.error(error.response.data.error, {
                timeout: 2000
            });
            return;
        })
    loading.value = false;
    change.value = false;
};


</script>

<template>
    <div>
        <Loader :loading="loading" />
        <form @submit.prevent="handleLogin">
            <div class="grid grid-cols-2 gap-10 w-full px-6">
                <div class="grid grid-cols-2 gap-4">
                    <fwb-input v-model="user.RazonSocial" label="Nombre" />
                    <fwb-input v-model="user.ApellidoPaterno" label="Apellido paterno" />
                    <fwb-input type="date" v-model="user.FechaNacimiento" label="Fecha de nacimiento" />
                    <fwb-select placeholder="Selecciona un país" v-model="user.PaisID" :options="countries" label="Pais" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <fwb-input v-model="user.ApellidoMaterno" label="Apellido materno" />
                    <fwb-input v-model="user.TelefonoCelular" label="Teléfono" />
                    <fwb-select placeholder="Selecciona un estado" v-model="user.EstadoID" :options="states"
                        label="Estado" />
                    <fwb-select placeholder="Selecciona un municipio" v-model="user.MunicipioID" :options="municipalities"
                        label="Municipio" />
                </div>
                <div>
                    <button :disabled="!change" type="submit"
                        class="w-full px-5 py-3 text-base font-medium text-center text-white disabled:bg-default/80 bg-default rounded-lg hover:bg-pink-700 disabled:hover:bg-default/80 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">
                        Guardar datos
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>