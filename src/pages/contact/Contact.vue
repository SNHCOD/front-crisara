<script setup>
import { ref } from 'vue'
import {
  FwbInput,
  FwbTextarea
} from 'flowbite-vue'
import AppLayout from '../../components/layout/AppLayout.vue';

const name = ref('')
</script>

<template>
  <AppLayout>
    <div>
      <section
      class="bg-center bg-cover bg-no-repeat bg-[url('https://www.crisarabisuteria.com/public/images/contacto.jpg')] bg-gray-500 bg-blend-multiply max-h-96">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-32">
          <h1 class="mb-4 text-4xl font-semibold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Contactanos</h1>
        </div>
      </section>
      <div class="w-2/3 mx-auto pt-5">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="mx-auto px-5">
            <h3 class="text-xl font-medium">
              ¿Tienes alguna duda?
            </h3>
            <p class="text-lg leading-loose pt-5">
              Comunicate con nosotros, te ayudamos, te asesoramos y buscamos la mejor solución para tus proyectos de bisutería, joyería e insumos.
            </p>
            <ul class="list-none pt-6 mb-10">
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                    <svg class="w-6 h-6 text-red-400 mx-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                      <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                    </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dirección</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          HerAv. México #3300 Local 11-A Zona C
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          Colonia Monraz, C.P. 44670
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          Guadalajara, Jalisco. México.
                        </p>
                    </div>
                </div>
              </li>
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                  <svg class="w-6 h-6 text-red-400 mx-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                    <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z"/>
                  </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Teléfono</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">+52 33 2646 9699</p>
                    </div>
                </div>
              </li>
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                  <svg class="w-6 h-6 text-red-400 mx-10" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Correo Electrónico</h5>
                        <a href="mailto:crisarainsumoybisuteria@gmail.com" class="mb-3 font-normal text-gray-700 dark:text-gray-400">crisarainsumoybisuteria@gmail.com</a>
                    </div>
                </div>
              </li>
              <li>                                
                <div class="flex flex-col items-center  md:flex-row md:max-w-xl hover:bg-gray-100 ">
                  <svg class="w-6 h-6 text-red-400 mx-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15.133 10.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175ZM4 4a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 4 4ZM2 8H1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 16 4Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
                  </svg>
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Horario</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          Lunes-Viernes 9:00 a.m. - 6:00 p.m
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          Sabado 9:00 a.m. - 2:00 p.m
                        </p>
                    </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="w-2/3 ml-5 space-y-10">
            <h3 class="text-xl font-medium">
              ¿Como te podemos ayudar?
            </h3>
            <fwb-input v-model="name" placeholder="Nombre" class="w-full">
              <template #prefix>
                <svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                  <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                </svg>
              </template>
            </fwb-input>
            <fwb-input v-model="name" placeholder="Correo electrónico" class="w-full">
              <template #prefix>
                <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914"/>
                </svg>
              </template>
            </fwb-input>
            <fwb-input v-model="name" placeholder="Teléfono" class="w-full">
              <template #prefix>
                <svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                  <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z"/>
                </svg>
              </template>
            </fwb-input>
            <fwb-input v-model="name" placeholder="Asunto" class="w-full mb-10">
              <template #prefix>
                <svg class="w-5 h-5 text-gray-500 mt-[-2.5rem]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </template>
            </fwb-input>
            <fwb-textarea
              label=""
              v-model="message"
              :rows="4"
              placeholder="Mensaje"
            />
            <button type="button" class="px-5 py-3 text-base font-medium text-center text-white bg-default rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-700">Enviar mensaje</button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
