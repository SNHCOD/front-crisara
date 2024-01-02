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
  { value: '14', name: 'United States' },
  { value: '3', name: 'Canada' },
  { value: '555', name: 'MEXICO' },
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
                    <fwb-input v-model="user.nombre" label="Nombre receptor"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.RFC" label="RFC receptor" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-select
                        placeholder="Selecciona"
                        v-model="user.municipio"
                        :options="countries"
                        label="Municipio"
                    />
                    <fwb-input v-model="user.cp" label="CP" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                    <fwb-input v-model="user.colonia" label="Colonia" />
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <fwb-select
                        placeholder="Selecciona"
                        v-model="user.pais"
                        :options="countries"
                        label="País"
                    />
                    <fwb-select
                        placeholder="Selecciona"
                        v-model="user.estado"
                        :options="countries"
                        label="Estado"
                    />
                    <fwb-input v-model="user.domicilio" label="Domicilio"/>
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
                    <fwb-input v-model="user.entre_calles" label="Entre calles" class="col-span-2"/>
                    <span class="text-xs text-red-500" v-for="error in v$.email.$errors" :key="error.uid">
                        {{ error.$message }}
                    </span>
                </div>
                <div>
                    <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">
                        Guardar datos
                    </button>
                </div>
        </div>
    </form>
</template>