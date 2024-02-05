<script setup>
import {
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbImg,
    FwbA,
    FwbButton, FwbInput
} from 'flowbite-vue'
import NavbarRework from '../../components/UI/NavbarRework.vue';
import { ref } from 'vue'

const query = ref('')
</script>

<template>
    <header class="container-xs">
        <NavbarRework/>
    </header>
</template>