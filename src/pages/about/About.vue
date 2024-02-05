<script setup>
import AppLayout from '../../components/layout/AppLayout.vue';
import CardTabs from '../../components/UI/CardTabs.vue';

</script>

<template>
  <AppLayout>
    <div>
      <section
      class="bg-center bg-cover bg-no-repeat bg-[url('https://www.crisarabisuteria.com/public/images/back.jpg')] bg-gray-500 bg-blend-multiply max-h-96">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-32">
          <h1 class="mb-4 text-4xl font-semibold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Sobre
            nosotros</h1>
        </div>
      </section>
      <div class="pt-2">
        <CardTabs />
      </div>

      <div class="py-10">
        <div class="w-full md:w-2/3 mx-auto pt-5">
          <span class="text-default text-2xl font-semibold">
            En <span class="font-bold">Crisara Bisutería</span> nos especializamos en:
          </span>
          <ul class="list-image-greencheckmark text-xl leading-loose pl-[4em]">
            <li>Oro</li>
            <li>Chapa</li>
            <li>Plata</li>
            <li>Accesorios</li>
            <li>Piedra</li>
          </ul>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
