<script setup>
import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel,
} from 'flowbite-vue'
import AppLayout from '../../components/layout/AppLayout.vue';

</script>

<template>
  <AppLayout>
    <section
      class="bg-center bg-cover bg-no-repeat bg-[url('https://www.crisarabisuteria.com/public/images/contacto.jpg')] bg-gray-500 bg-blend-multiply max-h-96">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-32">
        <h1 class="mb-4 text-4xl font-semibold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Envios</h1>
      </div>
    </section>
    <div class="pt-2">
      <CardTabs />
    </div>
    <div class="py-10">
      <div class="w-full md:w-2/3 mx-auto pt-5">
        <fwb-accordion always-open>
          <fwb-accordion-panel>
            <fwb-accordion-header><span class="text-lg">¿Cuánto tardan los envíos nacionales?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Depende el tipo de envío que seleccione y el envío que exista a su zona de envío,
                  tenemos envíos día siguiente (1 día hábil aproximadamente) y envíos terrestres que tardan de 3 a 5 días
                  hábiles aproximadamente.
                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
          <fwb-accordion-panel>
            <fwb-accordion-header><span class="text-lg">¿Cuánto cuesta mi envío?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Al concluir tu pago, una asesora te contactara para cotizarte el cobro de tu envió a tu código postal.
                </p>
                <p class="mb-2 text-gray-700 leading-loose">
                  Envío Terrestre: Manejamos un envío terrestre de 3 a 5 días hábiles, con peso máximo de 5 kg, (sugerido
                  en zonas alejadas o no urbanas que apliquen costo de reexpedicion y en paquetes con peso máximo de 5
                  kg.)

                </p>
                <p class="mb-2 text-gray-700 leading-loose">
                  Envíos internacionales: Tenemos varias promociones para envíos internacionales, para eso tendrás que
                  seleccionar la opción “Cotizar envío Internacional” y una asesora de ventas te contactara para brindarte
                  la información de las promociones y el costo total de tu envío.

                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
          <fwb-accordion-panel>
            <fwb-accordion-header><span class="text-lg">¿Qué empresas de paquetería manejan?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Actualmente trabajamos con FedEx.
                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
          <fwb-accordion-panel>
            <fwb-accordion-header><span class="text-lg">¿Cómo puedo rastrear mi envío?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Una vez realizada tu compra y efectuado tu pago, una asesora de ventas te contactara vía WhatsApp y te brindara información de tu guía correspondiente, 
                  la cual podrás rastrear desde la página de 
                  <a class="text-blue-600 hover:underline bg-blue-50" href="https://www.fedex.com/es-mx/tracking.html">Tracking FEDEX</a>
                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
          <fwb-accordion-panel>
            <fwb-accordion-header><span class="text-lg">¿Qué pasa si el empaque de mi paquete llega
                dañado?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Al momento de recibir el paquete te sugerimos tomes el tiempo necesario de revisar tu paquete para checar que no presente alteraciones en su empaque, 
                  nosotros te enviaremos foto de tu pedido para que puedas checar como va empaquetado y poder evitar estas situaciones, sino te convence el 
                  estado en el que te están entregando tu paquete favor de devolverlo al chofer de la unidad de paquetería y hacerle saber que no puedes recibir el paquete en ese estado.
                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
          <fwb-accordion-panel>
            <fwb-accordion-header><span class="text-lg">¿Qué pasa si mi paquete no llega completo?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Exclusivamente se aplica garantía en paquetes con algún faltante de mercancía, siempre y cuando el cliente cuente con un video que lo avale.
                </p>
                <p class="mb-2 text-gray-700 leading-loose">
                  El vídeo debe comenzar desde el momento en que se abrirá el paquete, haciendo un conteo rápido de piezas.
                </p>
                <p class="mb-2 text-gray-700 leading-loose">
                  Para hacer valida esta garantía, el paquete debe de estar perfectamente cerrado y el empaque no debe estar violado (cintas, caja, película).
                </p>
                <p class="mb-2 text-gray-700 leading-loose">
                  La reposición se hará enviando el producto faltante en el siguiente pedido, o bien con un saldo a favor por el valor del producto, utilizable en la siguiente compra.
                </p>
                <p class="mb-2 text-gray-700 leading-loose">
                  No hay reembolso.
                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
          <fwb-accordion-panel class="border-b">
            <fwb-accordion-header><span class="text-lg">¿Cuánto cuesta asegurar mi envío?</span></fwb-accordion-header>
            <fwb-accordion-content>
              <div>
                <p class="mb-2 text-gray-700 leading-loose">
                  Te recomendamos siempre asegurar tus envíos, el costo por asegurar varía de acuerdo al monto total de tu paquete, 
                  es un servicio directo con FedEx, nosotros te ayudamos a adquirirlo.
                </p>
              </div>
            </fwb-accordion-content>
          </fwb-accordion-panel>
        </fwb-accordion>
    </div>
  </div>
</AppLayout></template>
