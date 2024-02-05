<script setup>
import { ref } from 'vue'
import {
    FwbFooter,
    FwbFooterCopyright,
    FwbFooterLink,
    FwbFooterLinkGroup,
    FwbButtonGroup,
    FwbButton,
    FwbModal 
} from 'flowbite-vue'

const isShowModal = ref(false)
const selected = ref(0)

const data = [
    {
        title: 'Política de cancelación'
    },
    {
        title: 'Política de privacidad'
    },
    {
        title: 'Terminos y condiciones'
    },
    {
        title: 'Medios de pago'
    }
];

function closeModal () {
    isShowModal.value = false
}
function showModal (theme) {
    isShowModal.value = true
    this.selected = theme;
}
</script>

<template>
    <fwb-footer class="bg-default" footer-type="sitemap">
        <div class="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4 container mx-auto">
            <div>
                <h2 class="mb-6 text-lg font-semibold text-white uppercase">
                    Acerca de
                </h2>
                <div class="text-white max-w-xs">
                    <span class="leading-loose">
                        En Crisara Bisutería, creamos diseños exclusivos y únicos, productos hechos a mano utilizando
                        insumos de la mejor calidad.
                    </span>
                </div>
            </div>
            <div>
                <h2 class="mb-6 text-lg font-semibold uppercase text-white">
                    Siguenos en
                </h2>
                <fwb-button-group class="flex flex-wrap gap-2">
                    <fwb-button square>
                        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd"
                                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                clip-rule="evenodd" />
                        </svg>
                    </fwb-button>
                    <fwb-button square gradient="pink-orange">
                        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </fwb-button>
                    <fwb-button square color="dark">
                        <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path
                                d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                        </svg>
                    </fwb-button>
                    <fwb-button square color="light">
                        <svg class="w-6 h-6 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 14">
                            <path fill-rule="evenodd"
                                d="M19.7 3.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.84c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.84A4.225 4.225 0 0 0 .3 3.038a30.148 30.148 0 0 0-.2 3.206v1.5c.01 1.071.076 2.142.2 3.206.094.712.363 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.15 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965c.124-1.064.19-2.135.2-3.206V6.243a30.672 30.672 0 0 0-.202-3.206ZM8.008 9.59V3.97l5.4 2.819-5.4 2.8Z"
                                clip-rule="evenodd" />
                        </svg>
                    </fwb-button>
                </fwb-button-group>
            </div>
            <div>
                <h2 class="mb-6 text-lg font-semibold uppercase text-white">
                    Contactanos
                </h2>
                <div class="text-white max-w-xs">
                    <span class="leading-loose">
                        Fabricantes directo con la mejor experiencia para envios online
                    </span>
                </div>
            </div>
            <div>
                <h2 class="mb-6 text-lg font-semibold uppercase text-white">
                    Horario
                </h2>
                <div class="text-white max-w-xs">
                    <p class="leading-loose font-semibold text-lg">
                        Venta pagina web
                    </p>
                    <p class="leading-loose">
                        Lunes a viernes 9:00 am a 6:00pm
                    </p>
                </div>
                <div class="text-white max-w-xs">
                    <p class="leading-loose font-semibold text-lg">
                        Venta personalizada
                    </p>
                    <p class="leading-loose">
                        Lunes a viernes 10:00 am a 3:00pm
                    </p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4 w-full md:w-2/5 mx-auto">
            <div>
                <button class="text-white underline text-sm font-light" @click="showModal(0)">
                    Política de cancelación
                </button>
            </div>
            <div>
                <button class="text-white underline text-sm font-light" @click="showModal(1)">
                    Política de privacidad
                </button>
            </div>
            <div>
                <button class="text-white underline text-sm font-light" @click="showModal(2)">
                    Terminos y condiciones
                </button>
            </div>
            <div>
                <button class="text-white underline text-sm font-light" @click="showModal(3)">
                    Medios de pago
                </button>
            </div>
        </div>
        <div class="py-2 px-4 bg-gray-900 md:flex md:items-center md:justify-between">
            <fwb-footer-copyright by="Crisara Bisutería™." year="2017" copyrightMessage="Todos los derechos resevados"
                class="text-sm text-gray-300 sm:text-center" href="/" />
            <fwb-footer-link-group>
                <fwb-footer-link class="text-white" href="http://www.isysc.net/">
                    Desarrollada por ISySC Ingeniería de Software
                </fwb-footer-link>
            </fwb-footer-link-group>
        </div>
    </fwb-footer>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
        <template #header>
        <div class="flex items-center text-lg">
            {{ data[selected].title }}
        </div>
        </template>
        <template #body>
            <div v-show="selected == 0" class="space-y-3 w-full">
                <p>
                    En crisarabisuteria, nos esforzamos por armar tu pedido a la mejor perfección posible,
                    Pero si su paquete llegó dañado o tiene un error, por favor háganoslo saber inmediatamente. Queremos que nos lo haga saber y haremos todo lo posible para rectificar esta situación. Puede ponerse en contacto con nosotros en referencia a alguna devolución o cancelación, por favor envíenos un correo electrónico crisarainsumoybisuteria@gmail.com
                </p>
                <h2 class="text-lg">
                    POLÍTICA DE DEVOLUCIÓN
                </h2>
                <p>
                    Puedes devolver tu pedido nuevo sin usar, realizados por crisarabisuteria en los primeros 15 días de la fecha de entrega. Por favor, toma en cuenta que todos los productos personalizados devueltos tendrán una tasa de reposición del 25%.
                </p>
                <h2 class="text-lg">
                    POLÍTICA DE CANCELACIÓN
                </h2>
                <p>
                    Una vez que el pedido haya sido realizado, empezaremos inmediatamente la producción de tu paquete. Si deseas cancelar tu compra, la tasa de reposición será de 25% sobre el monto total.
                </p>
                <p>
                    Para cancelar tu pedido, por favor contacta con uno de nuestros representantes de servicio a cliente.
                </p>
                <p>
                    Las cancelaciones serán procesadas el día que recibamos la confirmación de tu cancelación. Se reembolsará la cuenta con la que compraba sus artículos. Dicho reembolso puede tomar hasta 7 días laborales desde la fecha en la que se aprobó su reembolso.
                </p>
                <p>
                    crisarabisuteria se reserva el derecho de hacer correcciones a esta política en cualquier momento, mismas que serán notificadas a través de esta página. Si tienes dudas sobre cancelaciones o cualquier otra de nuestras políticas, por favor contacta con nuestros representantes de servicio al cliente.
                </p>
            </div>
            <div v-show="selected == 1" class="space-y-3 w-full">
                <p>
                    Le recomendamos que revise las políticas de privacidad de cada sitio que visite.
                </p>
                <h2 class="text-lg">
                    Información que Recopilamos
                </h2>
                <p>
                    Podemos recopilar información sobre usted de una variedad de fuentes, incluida la información que recopilamos de usted directamente; información que recopilamos sobre usted cuando visita nuestros sitios, usa nuestros servicios, o ver nuestros anuncios en línea; e información que recopilamos sobre usted de otras fuentes. Recopilamos información personal sobre nuestros usuarios cuando utiliza este sitio web o servicio.
                </p>
                <h2 class="text-lg">
                    Información que recopilamos directamente de usted
                </h2>
                <p>
                    Recopilamos información directamente de usted cuando se registra en nuestro sitio, participa en nuestras ofertas, promociones, comprar productos de nuestro sitio, o proporcionarnos información directamente. Recopilamos información personal, junto con otros tipos de información, en el sitio web. “Información personal” significa información que, solo o en combinación con otra información, puede usarse para identificar o contactar a un individuo y puede incluir, pero no se limita a:
                </p>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>Nombre de usuario y contraseña.</li>
                    <li>Nombre, dirección de correo electrónico, dirección postal</li>
                    <li>Número de teléfono o número de teléfono móvil.</li>
                    <li>Información demográfica.</li>
                    <li>Información del pago (como una tarjeta de crédito).</li>
                    <li>Preferencias de comunicación futuras.</li>
                </ul>
                <h2 class="text-lg">
                    Información que recopilamos cuando visita nuestros sitios, compra nuestros productos, o ver nuestros anuncios en línea:
                </h2>
                <p>
                    Utilizamos cookies y otras tecnologías para recopilar información sobre usted cuando visita nuestros sitios, comprar nuestros productos o ver anuncios en línea. Los siguientes son ejemplos de información que podemos recopilar con estas tecnologías:
                </p>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>Su tipo de navegador y sistema operativo.</li>
                    <li>Páginas web que ves.</li>
                    <li>Enlaces haces clic.</li>
                    <li>Dirección IP.</li>
                    <li>Sitio que visitó antes de venir a nuestro sitio.</li>
                    <li>Ofertas promocionales o enlaces a te conectas por correo electrónico.</li>
                </ul>
                <h2 class="text-lg">
                    Información que recopilamos de otras fuentes:
                </h2>
                <p>
                    Podemos obtener información sobre usted de otras fuentes, incluyendo fuentes disponibles comercialmente y bases de datos públicos. Los siguientes son ejemplos de información que podemos recopilar de otras fuentes:
                </p>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>Nombre, dirección postal.</li>
                    <li>Años.</li>
                    <li>Nivel de ingresos.</li>
                    <li>Sus intereses como pasatiempos y mascotas.</li>
                    <li>Datos de consumidores y estudios de mercado.</li>
                    <li>Comportamiento de compra.</li>
                    <li>Datos o actividades observados públicamente, como blogs, videos, contenido generado por el usuario, comportamiento de compra.</li>
                </ul>
                <p>
                    Toda la información que recopilamos sobre usted puede combinarse, lo que nos ayuda a personalizar nuestras comunicaciones con usted y maximizar la experiencia de su cliente con nosotros.
                </p>
                <h2 class="text-lg">
                    Cómo usamos esta Información
                </h2>
                <p>
                    CrisaraBisuteria no vende, comercia, o alquila su información personal a otros. Esta información es solo para nuestros registros privados. Podemos, sin embargo, use la información que recopilamos para proporcionar los productos y servicios que solicita, para informarle sobre otros productos y servicios que ofrecemos y para administrar nuestros sitios y servicios.
                </p>
                <p>
                    Las siguientes son formas en que podemos usar la información que recopilamos sobre usted:
                </p>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>Enviar ofertas especiales, nuevas llegadas, promociones etc.</li>
                    <li>Desarrollar nuevos productos y servicios.</li>
                    <li>Para proporcionarle otros servicios que le hemos ofrecido</li>
                    <li>Crea y administra tu cuenta.</li>
                    <li>Procesar pagos por compras u otros servicios.</li>
                    <li>Protegerse o identificar posibles transacciones fraudulentas.</li>
                    <li>Desarrolle y proporcione publicidad adaptada a sus intereses.</li>
                    <li>Analizar el uso de nuestros productos, servicios y sitios.</li>
                    <li>Determinar la efectividad de nuestra publicidad.</li>
                </ul>
                <h2 class="text-lg">
                    Sus ppciones y acceso a su Información
                </h2>
                <p>
                    Le damos opciones sobre cómo nos comunicamos con usted. Solo le enviamos mensajes de correo electrónico promocionales si nos proporciona su información de contacto y opta por recibirlos. Puede dejar de recibir mensajes de correo electrónico promocionales de CrisaraBisuteria siguiendo las instrucciones proporcionadas en cualquier mensaje que reciba.
                </p>
                <p>
                    Nuestro sitio le brinda la oportunidad de participar y no recibir comunicaciones de CrisaraBisuteria. Para eliminar su información de nuestra base de datos, por favor contáctenos con su solicitud en línea. Puede solicitar su derecho de acceso o su derecho de corrección iniciando sesión en https://www.crisarabisuteria.com Como usuario registrado, puede ver, corregir o actualizar la información de contacto personal que nos proporciona en cualquier momento. Le recomendamos que no revele su contraseña a nadie y no elija guardar su información de inicio de sesión en computadoras compartidas. Nosotros, CrisaraBisuteria, nunca le pediremos su contraseña en llamadas telefónicas no solicitadas ni en correos electrónicos no solicitados.
                </p>
                <p>
                    Aunque tratamos de proteger su información, no hay un sitio web o empresa, incluido CrisaraBisuteria puede garantizar o garantizar absolutamente la seguridad de cualquier información, lo que transmita o sufra será bajo su propio riesgo.
                </p>
                <h2 class="text-lg">
                    Métodos de seguridad de pago
                </h2>
                <p>
                    Mantenemos administrativos, técnicos, y salvaguardas físicas para proteger su información personal. Cuando recopilamos o transmitimos información confidencial, como un número de tarjeta de crédito o débito, Utilizamos métodos estándar de la industria para proteger esa información. CrisaraBisuteria no retiene números de tarjetas de crédito o débito en nuestros sistemas.
                </p>
                <h2 class="text-lg">
                    Cookies
                </h2>
                <p>
                    Empleamos cookies para acelerar su navegación, reconocer sus privilegios de acceso, y rastrear el uso de sus sitios.
                </p>
                <p>
                    Una cookie es un pequeño archivo colocado en su computadora cuando visita un sitio que puede ser entendido por el sitio que emitió la cookie. Utilizamos cookies para controlar cómo se usan nuestros sitios y para ayudarlo a personalizar su experiencia en línea. Luego, podemos usar la información que proporcionó cuando se registró en combinación con sus actividades en nuestros sitios para proporcionarle publicidad y ofertas de interés. La mayoría de los navegadores aceptan cookies automáticamente.
                </p>
                <p>
                    Si no desea que se coloquen cookies en su computadora, debe configurar su navegador para rechazar las cookies antes de acceder a este sitio web, con el entendimiento de que ciertas características y/o servicios pueden no funcionar correctamente sin la ayuda de cookies. Si rechaza las cookies, asume toda la responsabilidad por cualquier pérdida resultante de funcionalidad.
                </p>
                <h2 class="text-lg">
                    Sitio web de terceros
                </h2>
                <p>
                    Confiamos en proveedores de servicios externos para que realicen una variedad de servicios en nuestro nombre. Al hacerlo, es posible que necesitemos compartir su información personal con ellos. Tenga en cuenta que proporcionamos a nuestros proveedores de servicios solo la información personal necesitan realizar sus servicios y nosotros requerimos que protegen esta información y no la usan para ningún otro propósito.
                </p>
                <p>
                    Por ejemplo, podemos responder a un proveedor de servicios a:
                </p>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>Satisfaga sus solicitudes de productos y servicios y responda sus preguntas.</li>
                    <li>Aloje nuestros sitios y envíe nuestros correos electrónicos y mensajes móviles.</li>
                    <li>Contactar con los ganadores del concurso, administrar pagos o tomar otras medidas en nuestro nombre.</li>
                    <li>Analizar datos, a veces combinados con otras fuentes, para enviarle comunicaciones más específicas.</li>
                    <li>Realizar investigaciones y analizar datos para mejorar nuestros productos, servicios y sitios.</li>
                </ul>
                <p>
                    Proporcionamos a estas empresas la información personal que necesitan para proporcionar estos servicios en nuestro nombre. Exigimos a estas compañías que protejan esta información personal y que no la utilicen para ningún otro propósito.
                </p>
                <h2 class="text-lg">
                    Contenido generado por el usuario
                </h2>
                <p>
                    Permitimos a los usuarios enviar su propio contenido para concursos, blogs, videos, y otras funciones. Por favor recuerde que dicha información revelada se convierte en información pública y no está cubierto por esta Política de Privacidad.
                </p>
                <p>
                    Debe tener precaución al decidir revelar su información personal, información financiera o de otro tipo en una presentación. No podemos evitar que dicha información se use de una manera que pueda violar esta Declaración de Privacidad, la Ley, o su privacidad y seguridad personal. CrisaraBisuteria no es responsable del contenido generado por el usuario. El contenido generado por el usuario sigue siendo responsabilidad exclusiva de la persona que lo envió.
                </p>
                <h2 class="text-lg">
                    Privacidad en línea para niños
                </h2>
                <p>
                    Reconocemos la importancia de proteger la privacidad en línea de los niños. Leads no recopila información intencionalmente de niños menores de 13 años, y CrisaraBisuteria no dirige su sitio web a niños.
                </p>
                <h2 class="text-lg">
                    Cambios en los Términos y la Política de Privacidad
                </h2>
                <p>
                    Cualquier cambio en la Política de Privacidad será comunicado a través de nuestro publicado y modificado y política de privacidad actualizada en nuestro sitio. Nuestra publicación de la política de privacidad modificada y reformulada hará que dicha nueva política de privacidad sea efectiva de inmediato. Usted acepta que toda la información personal recopilada se regirá por la política de privacidad más reciente que esté vigente. Si no está de acuerdo con los nuevos cambios en nuestra política de privacidad, deberías contactar a CrisaraBisuteria por escrito y solicite específicamente que CrisaraBisuteria regrese y/o todas las copias de toda o parte de su información recopilada en la posesión de CrisaraBisuteria.
                </p>
                <p>
                    Si, en cualquier momento, tiene preguntas o inquietudes sobre la política de privacidad de CrisaraBisuteria, Por favor contáctenos por correo electrónico: crisarainsumoybisuteria@gmail.com
                </p>
            </div>
            <div v-show="selected == 3" class="space-y-3 w-full">
                <p>
                    En crisarabisuteria aceptamos las principales tarjetas y pagos realizados a través de PayPal.
                </p>
                <p>
                    Comenzaremos la producción de su pedido una vez que se confirme el pago. 
                </p>
                <p>
                    Con el fin de establecer un pago, simplemente haz click en los botones de “Pagar con Paypal”.
                </p>
                <p>
                    Serás dirigido automáticamente al sitio web de pago seleccionado, donde tendrás la opción de pagar con tu tarjeta de crédito o a través de una cuenta PayPal existente.
                </p>
                <p>
                    Si deseas pagar con tu tarjeta de crédito, por favor, utiliza el botón de "Pagar con tarjeta" opción en la página de carrito.
                </p>
                <p>
                    Podrás ingresar la información de tu tarjeta de forma segura.
                </p>
                <p>
                    Puedes usar tu tarjeta de débito a través de PayPal. No es necesario ser un usuario de PayPal para pagar con éste método.
                </p>
                <img src="https://crisarabisuteria.com/public/images/pagos_crisara_min.png" alt="imágen de tarjetas" class="mx-auto py-4"/>
                <p>
                    La información de tarjeta de crédito no es procesada a través de o almacenados en los servidores de crisarabisuteria y nunca pasamos información a un tercero.
                </p>
                <img src="https://crisarabisuteria.com/public/images/pagos_crisara.jpg" alt="imágen de tarjetas" class="mx-auto py-4"/>
                <span>
                    crisarabisuteria se reserva el derecho de hacer cambios en las políticas. La notificación de estos cambios se publicará en esta página. Si tienes alguna pregunta o comentario sobre cualquiera de nuestras políticas, por favor ponte en 
                    <a href="/contact/" class="underline text-blue-700">
                        contacto con nosotros
                    </a>
                </span>
            </div>
        </template>
        <template #footer>
        <div class="flex justify-end">
            <fwb-button @click="closeModal" color="alternative">
            Cerrar
            </fwb-button>
        </div>
        </template>
    </fwb-modal>
</template>