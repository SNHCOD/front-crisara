<script setup>
// Importar funcionalidades | utilidades
import { ref, watch, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
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
const countries = cats.countries;
const states = cats.states;
const masterMun = cats.municipalities;

// Datos manipulables del componente
const user = ref(customer);
const municipalities = ref(user.value.EstadoID ? masterMun.filter(municipality => municipality.state == user.value.EstadoID) : masterMun);


const rules = computed(() => {
return {
    MunicipioID: { 
        required: helpers.withMessage('Municipio requerido', required)
    },
    codigoPostal: { 
        required: helpers.withMessage('Código postal requerido', required), 
        minLength: helpers.withMessage('Dato muy corto', minLength(5)) 
    },
    colonia: { 
        required: helpers.withMessage('Colonia requerida', required), 
    },
    PaisID: { 
        required: helpers.withMessage('País requerido', required), 
    },
    EstadoID: { 
        required: helpers.withMessage('Estado requerido', required), 
    },
    domicilio: { 
        required: helpers.withMessage('Dirección requerida', required), 
    },
    numeroExterior: { 
        required: helpers.withMessage('Requerido', required), 
    },
    entreCalles: { 
        required: helpers.withMessage('Referencias requeridas', required), 
    },
}
});
const v$ = useVuelidate(rules, user.value);

const submitForm = async () => {
const result = await v$.value.$validate();
if(result) {
    loading.value = true;
    handleLogin();
}
};

// Definición de métodos
watch(user.value, () => {
    change.value = true;
    municipalities.value = masterMun.filter(municipality => municipality.state == user.value.EstadoID);
})

const handleLogin = async () => {
    user.value.SD = true;
    user.value.id = client_id;
    user.value.token = token;
    loading.value = true;
    await CustomerService.update(user.value)
        .then(response => {
            const data = response.data;
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
        <form @submit.prevent="submitForm">
            <div class="grid grid-cols-4 gap-4">
                <div class="h-20">
                    <fwb-input v-model="user.NombreReceptor" label="Nombre receptor" />
                </div>
                <div class="h-20">
                        <fwb-input v-model="user.rfc" label="RFC receptor" />
                </div>
                <div class="h-20">                    
                    <fwb-select placeholder="Selecciona" v-model="user.PaisID" :options="countries" label="País" />
                    <span class="text-xs text-red-500" v-for="error in v$.PaisID.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="h-20">
                    <fwb-select placeholder="Selecciona" v-model="user.EstadoID" :options="states" label="Estado" />
                    <span class="text-xs text-red-500" v-for="error in v$.EstadoID.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="h-20">
                    <fwb-select placeholder="Selecciona" v-model="user.MunicipioID" :options="municipalities"
                        label="Municipio" />
                    <span class="text-xs text-red-500" v-for="error in v$.MunicipioID.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="h-20">
                    <fwb-input v-model="user.codigoPostal" label="CP" />
                    <span v-if="v$.codigoPostal.$errors.length > 0" class="text-xs text-red-500" v-for="error in v$.codigoPostal.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="h-20">
                    <fwb-input v-model="user.domicilio" label="Domicilio" />
                    <span class="text-xs text-red-500" v-for="error in v$.domicilio.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="h-20">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <fwb-input v-model="user.numeroExterior" label="N. exterior" />
                            <span class="text-xs text-red-500" v-for="error in v$.numeroExterior.$errors" :key="error.uid">
                                {{ error.$message }}
                            </span>
                        </div>
                        <fwb-input v-model="user.numeroInterior" label="N. interior" />
                    </div>
                </div>
                <div class="col-span-2 h-20">
                    <fwb-input v-model="user.colonia" label="Colonia" />
                    <span class="text-xs text-red-500" v-for="error in v$.colonia.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="col-span-2 h-28">
                    <fwb-input v-model="user.entreCalles" label="Entre calles" />
                    <span class="text-xs text-red-500" v-for="error in v$.entreCalles.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
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