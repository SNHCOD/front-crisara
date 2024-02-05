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
const change = ref(false);
const loading = ref(false);
const toast = useToast();

// Datos de persistencia
const { customer, cats, token, client_id } = defineProps(['customer', 'cats', 'token', 'client_id']);
const cfdi = cats.cfdi;
const payments = cats.payments;

// Datos manipulables del componente
const user = ref(customer);

// Definición de ciclo de vida

// Definición de métodos
watch(user.value, () => {
    change.value = true;
})

const handleLogin = async () => {
    user.value.id = client_id;
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
            console.log(error);
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
                    <fwb-input v-model="user.RFC" label="RFC" />
                    <fwb-input v-model="user.NombreComercial" label="Nombre comercial" />
                    <fwb-input v-model="user.CodigoPostal" label="CP fiscal" />
                    <fwb-input v-model="user.Correo" label="Correo fiscal" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <fwb-input v-model="user.Domicilio" label="Domicilio fiscal" />
                    <div class="grid grid-cols-2 gap-4">
                        <fwb-input v-model="user.NoExterior" label="N. exterior" />
                        <fwb-input v-model="user.NoInterior" label="N. interio" />
                    </div>
                    <fwb-select placeholder="Selecciona" v-model="user.UsoCFDiID" :options="cfdi" label="Uso de CFDI" />
                    <fwb-select placeholder="Selecciona" v-model="user.FormaPagoID" :options="payments"
                        label="Método de pago" />
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