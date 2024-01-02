<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, computed, defineProps } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
// Importar componentes
import { FwbInput, FwbSelect } from 'flowbite-vue'

// Definición de datos
// Datos de comportamiento
const { customer } = defineProps(['customer']);
const countries = [
  { value: '19', name: 'United States' },
  { value: '3', name: 'Canada' },
]

// Datos de persistencia

// Datos manipulables del componente
const user = ref(customer);

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
const v$ = useVuelidate(rules, user);

const submitForm = async () => {
    const result = await v$.value.$validate();
    if (result) {
        handleLogin();
    }
};

// Definición de ciclo de vida
onMounted(() => {
})

// Definición de métodos
const handleLogin = async () => {
};

</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-10 w-full px-6">
                <div class="grid grid-cols-2 gap-4">
                    <fwb-input v-model="user.RFC" label="RFC"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.nombre_comercial" label="Nombre comercial" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.cp" label="CP fiscal" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.correo" label="Correo fiscal" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <fwb-input v-model="user.domicilio_fiscal" label="Domicilio fiscal"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <div class="grid grid-cols-2 gap-4">
                        <fwb-input v-model="user.no_exterior" label="N. exterior" />
                        <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                            {{ error.$message }}
                        </span>
                        <fwb-input v-model="user.no_interior" label="N. interio" />
                        <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                            {{ error.$message }}
                        </span>
                    </div>
                    <fwb-select
                        placeholder="Selecciona"
                        v-model="user.cfdi"
                        :options="countries"
                        label="Uso de CFDI"
                    />
                    <fwb-select
                        placeholder="Selecciona"
                        v-model="user.forma_pago"
                        :options="countries"
                        label="Método de pago"
                    />
                </div>
                <div>
                    <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">
                        Guardar datos
                    </button>
                </div>
        </div>
    </form>
</template>