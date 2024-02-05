<script setup>
import Navbar from '../../components/layout/Navbar.vue';
import FooterLayout from '../../components/layout/FooterLayout.vue';
</script>

<template>
    <Navbar />
    <main class="container-xs h-auto min-h-[calc(100vh-400px)] mt-5 border-t-4 border-default bg-white">
        <slot>
        </slot>
    </main>
    <FooterLayout />
</template>