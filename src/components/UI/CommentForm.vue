<script setup>
// Importar funcionalidades | utilidades
import { ref, onMounted, computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import CommentService from '@/services/CommentService';

// Importar componentes
import { FwbInput } from 'flowbite-vue'
import Spinner from '@/components/UI/Spinner.vue';

// Definición de datos
const { aud_data } = defineProps(['aud_data']);
const sendingComment = ref(false);
const router = useRouter()
// Datos de comportamiento

// Datos de persistencia

// Datos manipulables del componente
const comment = ref({
    customer_id: aud_data.customer_id,
    product_id: aud_data.product_id,
    name: aud_data.name,
    comment: "Me encantó 😍",
    rate: 50
});

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('Nombre requerido', required)
        },
        comment: {
            required: helpers.withMessage('Comentario requerido', required)
        },
        rate: {
            required: helpers.withMessage('Valoración requerida', required)
        },
    }
});

const v$ = useVuelidate(rules, comment);

const submitForm = async () => {
    const result = await v$.value.$validate();
    if (result) {
        sendComment();
    }
};

// Definición de métodos
const sendComment = async () => {    
    sendingComment.value = true;
    await CommentService.comment(comment.value);
    sendingComment.value = false;
    window.location.reload();
};

</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-10 w-full px-6">
            <fwb-input v-model="comment.name" label="Nombre" :disabled="aud_data.user"/>
            <span class="text-xs text-red-500" v-for="error in v$.name.$errors" :key="error.uid">
                {{ error.$message }}
            </span>
            <fwb-input v-model="comment.comment" label="Comentario" />
            <span class="text-xs text-red-500" v-for="error in v$.comment.$errors" :key="error.uid">
                {{ error.$message }}
            </span>       
            <div class="relative mb-6">      
                <div class="flex">
                    <div class="flex-1 min-w-0">
                        <label for="rate" class="block mb-2 text-sm font-medium text-gray-900">Valoración</label>
                    </div>
                        <svg class="w-8 h-8 text-yellow-300 start-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                
                        </svg>
                    <span class="text-lg font-semibold ml-1 mt-1 min-w-[1.6rem]">
                        {{ comment.rate/10 }}
                    </span>
                </div>    
                <input id="rate" name="rate" type="range" v-model="comment.rate" min="0" max="50" step="5" class="w-full h-2 bg-gray-200 accent-red-500 rounded-lg appearance-none cursor-pointer"/>    

                <span class="text-xs text-red-500" v-for="error in v$.rate.$errors" :key="error.uid">
                    {{ error.$message }}
                </span>  
            </div>
            <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700 sm:w-auto">
                <Spinner v-show="sendingComment" />
                <span v-show="!sendingComment">
                    Comentar
                </span>
            </button>
        </div>
    </form>
</template>