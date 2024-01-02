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
  { value: '1', name: 'United States' },
  { value: '14', name: 'Canada' },
  { value: '3292', name: 'France' },
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
                    <fwb-input v-model="user.nombre" label="Nombre"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.apellido_paterno" label="Apellido paterno" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input type="date" v-model="user.fecha_nacimiento" label="Fecha de nacimiento" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-select
                        placeholder="Selecciona un país"
                        v-model="user.pais"
                        :options="countries"
                        label="Pais"
                    />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <fwb-input v-model="user.apellido_materno" label="Apellido materno"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.telefono" label="Teléfono"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-select
                        placeholder="Selecciona un estado"
                        v-model="user.estado"
                        :options="countries"
                        label="Estado"
                    />
                    <fwb-select
                        placeholder="Selecciona un municipio"
                        v-model="user.municipio"
                        :options="countries"
                        label="Municipio"
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