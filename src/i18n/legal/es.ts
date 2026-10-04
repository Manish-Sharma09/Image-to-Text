// Spanish legal documents. Translated from en.ts — see the conventions there.
import type { Legal } from './en';

const es = {
  privacy: {
    title: 'Política de privacidad',
    intro: 'La política completa, sección por sección. El resumen de arriba es una versión breve y fiel; si difieren, prevalece esta política.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Quiénes somos',
        html: '<p>Esta política se aplica a {site}, en {url}, y a su herramienta de imagen a texto, gestionados por {operator} («nosotros»). Explica qué información se trata cuando usas el sitio, con qué fines y qué opciones tienes. Conforme a la normativa de protección de datos, como el RGPD de la UE y el del Reino Unido, somos el responsable del tratamiento de la información descrita aquí.</p><p>Preguntas o solicitudes: <a href="mailto:{email}">{email}</a>.</p>',
      },
      {
        id: 'information-we-process',
        title: 'Información que tratamos',
        html: '<p>La herramienta está diseñada para necesitar la menor información posible. Esto es todo lo que se trata, y dónde.</p><ul><li><strong>Imágenes y texto que lees en tu dispositivo.</strong> La lectura se hace en tu navegador. Tus imágenes, el texto y tus cambios no se nos envían, y no podemos verlos.</li><li><strong>Lectura mejorada, solo si la eliges.</strong> Cuando se ofrece esta opción, la imagen de la página que confirmes, y solo esa, reducida a un máximo de 2000 píxeles, se envía a nuestro servidor junto con el modo de lectura y los idiomas que hayas elegido, y se transmite a Anthropic para que la lea. El texto se te devuelve. No guardamos la imagen ni el texto.</li><li><strong>Imágenes desde un enlace.</strong> Si tu navegador no puede cargar directamente el enlace de una imagen, nuestro servidor obtiene esa imagen por ti y te la devuelve de inmediato, sin guardarla. Para ello, el servidor recibe el enlace que pegaste.</li><li><strong>Datos técnicos de las solicitudes.</strong> Como cualquier sitio web, nuestro servidor y nuestro proveedor de alojamiento reciben la información que tu navegador envía con cada solicitud: tu dirección IP, el tipo de navegador, la página solicitada y la hora. Para aplicar los límites diarios de la Lectura mejorada y de la obtención de imágenes desde enlaces, contamos las solicitudes por visitante mediante un hash de la dirección IP generado con una clave que cambia cada día. Los recuentos se descartan a diario.</li><li><strong>Mensajes que nos envías.</strong> Si nos escribes por correo electrónico, recibimos tu dirección de correo y todo lo que incluyas en el mensaje.</li><li><strong>Datos guardados en tu dispositivo.</strong> Tus preferencias (como el tema y los idiomas), el Historial si lo activas, y los archivos de la aplicación y del motor guardados en caché se conservan en el almacenamiento de tu navegador. Permanecen en tu dispositivo y nunca se nos envían.</li></ul><p>No hay cuentas, nunca te pedimos tu nombre y no usamos publicidad, cookies de seguimiento ni analítica de terceros.</p>',
      },
      {
        id: 'service-providers',
        title: 'Servicios que intervienen en el funcionamiento del sitio',
        html: '<p>Algunos servicios externos ayudan a ofrecer el sitio. Ninguno de ellos recibe tus imágenes, salvo Anthropic cuando eliges la Lectura mejorada.</p><ul><li><strong>Nuestro proveedor de alojamiento</strong> ejecuta nuestro servidor y trata los datos de las solicitudes por cuenta nuestra para ofrecer el sitio.</li><li><strong>jsDelivr.</strong> Los archivos de idioma del motor de texto, y el decodificador que se usa para las fotos HEIC de iPhone en los navegadores que no pueden abrirlas de forma nativa, se descargan desde la red de distribución de contenidos de jsDelivr. jsDelivr ve tu dirección IP y qué archivo se ha solicitado, nunca tus imágenes. Consulta la <a href="https://www.jsdelivr.com/terms/privacy-policy" rel="noopener">política de privacidad de jsDelivr</a>.</li><li><strong>Anthropic</strong>, solo para la Lectura mejorada y solo para la página que confirmes. La página se trata a través de la API comercial de Anthropic; las condiciones comerciales de Anthropic indican que, por defecto, no entrena sus modelos con datos de la API. Consulta la <a href="https://www.anthropic.com/legal/privacy" rel="noopener">política de privacidad de Anthropic</a>.</li></ul><p>Las páginas, las fuentes, los scripts y el propio motor de texto se sirven desde nuestro propio dominio.</p>',
      },
      {
        id: 'why-we-process-it',
        title: 'Por qué la tratamos',
        html: '<p>Solo tratamos información con estos fines y sobre estas bases jurídicas del RGPD:</p><ul><li><strong>Para ofrecerte las funciones que solicitas</strong>, como la Lectura mejorada y la obtención de una imagen desde un enlace (ejecución de un contrato, art. 6.1.b) del RGPD).</li><li><strong>Para mantener el sitio seguro y en funcionamiento</strong>, lo que incluye prevenir abusos y aplicar los límites diarios (nuestros intereses legítimos, art. 6.1.f) del RGPD).</li><li><strong>Para responder a tus mensajes</strong> (nuestro interés legítimo en responderte, art. 6.1.f) del RGPD).</li><li><strong>Para cumplir obligaciones legales</strong>, cuando una ley lo exija (art. 6.1.c) del RGPD).</li></ul><p>Nunca vendemos tu información, ni la usamos para publicidad, ni usamos tus imágenes o tu texto para entrenar modelos de IA.</p>',
      },
      {
        id: 'how-long-we-keep-it',
        title: 'Cuánto tiempo la conservamos',
        html: '<ul><li><strong>Imágenes y texto leídos en tu dispositivo:</strong> nosotros nunca los conservamos. Con el Historial activado, permanecen en tu navegador hasta que los borres.</li><li><strong>Lectura mejorada e imágenes desde un enlace:</strong> no se guardan en nuestro servidor; solo existen mientras se gestiona la solicitud. La conservación por parte de Anthropic se describe en su política de privacidad.</li><li><strong>Contadores del límite diario:</strong> se descartan cada día.</li><li><strong>Datos técnicos de las solicitudes:</strong> nuestro servidor y nuestro proveedor de alojamiento los conservan solo el tiempo necesario por motivos de seguridad y para resolver problemas, y después se eliminan.</li><li><strong>Correos electrónicos:</strong> se conservan el tiempo necesario para atender tu mensaje y cualquier seguimiento, y después se eliminan.</li></ul>',
      },
      {
        id: 'sharing',
        title: 'Con quién la compartimos',
        html: '<p>No vendemos ni alquilamos información personal, ni la compartimos para publicidad conductual entre contextos. Solo la compartimos con los proveedores de servicios descritos arriba, que la tratan por cuenta nuestra, o cuando la ley lo exige: por ejemplo, para atender un requerimiento legal válido o para proteger los derechos y la seguridad de nuestros usuarios y del sitio.</p>',
      },
      {
        id: 'international-transfers',
        title: 'Transferencias internacionales',
        html: '<p>Nuestros proveedores de servicios pueden tratar información en países distintos del tuyo, incluidos los Estados Unidos. Cuando la ley lo exige, estas transferencias se basan en garantías adecuadas, como las cláusulas contractuales tipo de la Comisión Europea.</p>',
      },
      {
        id: 'cookies',
        title: 'Cookies y almacenamiento local',
        html: '<p>No instalamos cookies. El sitio usa el almacenamiento local, IndexedDB y la caché de tu navegador solo para las funciones que utilizas: recordar tu tema, tus idiomas y tus ajustes, conservar el Historial si lo activas y permitir que la herramienta funcione sin conexión. Nada de ello se usa para seguimiento ni publicidad, y puedes borrarlo en cualquier momento desde la configuración de tu navegador.</p>',
      },
      {
        id: 'your-rights',
        title: 'Tus derechos',
        html: '<p>Según dónde vivas, puedes tener derecho a acceder a tu información personal, a rectificarla o suprimirla, a oponerte al uso que hacemos de ella o a limitarlo, a recibirla en un formato portable y a retirar cualquier consentimiento que hayas dado. En la UE, el Reino Unido y jurisdicciones similares, también puedes presentar una reclamación ante tu autoridad de protección de datos.</p><p>Si vives en California, tienes derecho a saber qué información personal recopilamos y cómo la usamos, a pedirnos que la eliminemos o la corrijamos, y a no sufrir discriminación por ejercer estos derechos. No vendemos ni compartimos información personal en el sentido que la CCPA da a esos términos.</p><p>Para hacer una solicitud, escribe a <a href="mailto:{email}">{email}</a>. Como la herramienta no recopila tus imágenes ni tu texto y no tiene cuentas, normalmente no tenemos nada que te identifique, pero responderemos a cada solicitud dentro del plazo que permita la ley. Los datos de tu dispositivo están bajo tu control: borra documentos desde el panel Historial o elimina los datos de este sitio en tu navegador.</p>',
      },
      {
        id: 'children',
        title: 'Menores',
        html: '<p>El sitio no está dirigido a menores de 13 años, o de 16 en el Espacio Económico Europeo, y no recopilamos a sabiendas información personal de ellos. Si crees que un menor nos ha enviado información personal, ponte en contacto con nosotros y la eliminaremos.</p>',
      },
      {
        id: 'security',
        title: 'Seguridad',
        html: '<p>El sitio se sirve mediante HTTPS, las imágenes se leen en tu dispositivo por defecto y nuestro servidor no almacena ni imágenes ni texto. La función de obtención de imágenes desde enlaces solo se conecta a direcciones web públicas, con límites de tamaño y de tiempo. Ningún método de transmisión o almacenamiento es completamente seguro, pero mantener tus datos fuera de nuestros servidores es la mayor protección que podemos ofrecer.</p>',
      },
      {
        id: 'changes',
        title: 'Cambios en esta política',
        html: '<p>Si cambiamos esta política, actualizaremos la fecha que aparece al principio de esta página. Si un cambio afecta de forma sustancial al tratamiento de tu información, también lo indicaremos en el sitio antes de que entre en vigor.</p>',
      },
      {
        id: 'contact',
        title: 'Contacto',
        html: '<p>Para cualquier cuestión sobre privacidad, escribe a <a href="mailto:{email}">{email}</a> o usa la <a href="/contact">página de contacto</a>.</p>',
      },
    ],
  },

  terms: {
    eyebrow: 'Legal',
    title: 'Términos y condiciones',
    lede: 'El acuerdo entre tú y nosotros cuando usas {site}. Lo hemos redactado de la forma más breve y clara posible.',
    sections: [
      {
        id: 'agreement',
        title: 'Aceptación de estos términos',
        html: '<p>Estos términos se aplican cuando usas {site} en {url} (el «sitio»), incluida su herramienta de imagen a texto (el «servicio»). El sitio está gestionado por {operator} («nosotros»). Al usar el sitio, aceptas estos términos. Nuestra <a href="/privacy">política de privacidad</a> explica cómo tratamos tu información. Si no aceptas estos términos, por favor, no uses el sitio.</p>',
      },
      {
        id: 'the-service',
        title: 'El servicio',
        html: '<p>{site} convierte imágenes y archivos PDF en texto editable. Por defecto, la lectura se hace en tu navegador, y el servicio se puede usar gratis y sin cuenta. Podemos añadir, cambiar o retirar funciones en cualquier momento, y no garantizamos que el servicio esté siempre disponible, funcione sin interrupciones o esté libre de errores.</p>',
      },
      {
        id: 'your-content',
        title: 'Tus imágenes y tu texto',
        html: '<ul><li><strong>Siguen siendo tuyos.</strong> Conservas todos los derechos que tengas sobre las imágenes que lees y el texto que obtienes de ellas. No reclamamos la propiedad de ninguno de los dos.</li><li><strong>No los recibimos</strong> cuando se leen en tu dispositivo. Si usas la Lectura mejorada u obtienes una imagen desde un enlace, nos autorizas a nosotros y a nuestros proveedores de servicios a tratar esa imagen solo en la medida necesaria para devolverte el resultado.</li><li><strong>Debes tener derecho a usarlos.</strong> Lee solo imágenes que sean tuyas o que tengas permiso para usar, y respeta los derechos de autor, la privacidad y la confidencialidad de otras personas cuando uses el texto.</li></ul>',
      },
      {
        id: 'acceptable-use',
        title: 'Uso aceptable',
        html: '<p>Te pedimos que hagas un uso responsable del sitio. Te comprometes a no:</p><ul><li>usar el servicio para infringir ninguna ley ni vulnerar los derechos de nadie;</li><li>tratar material ilegal o que no tengas derecho a tratar;</li><li>enviar solicitudes automatizadas o masivas a nuestros servidores, ni intentar eludir los límites diarios u otras protecciones;</li><li>interferir en el sitio, perturbar su funcionamiento para otras personas o buscar vulnerabilidades en él sin nuestro permiso (si encuentras un problema de seguridad, comunícalo a <a href="mailto:{email}">{email}</a>);</li><li>usar la función de obtención de imágenes desde enlaces para acceder a direcciones a las que no tienes permiso para acceder;</li><li>presentar el sitio o sus resultados como un servicio propio, ni dar a entender que te respaldamos.</li></ul><p>Los componentes de código abierto de la herramienta pueden usarse con arreglo a sus propias licencias; estas normas se refieren a nuestro sitio y a nuestros servidores.</p>',
      },
      {
        id: 'accuracy',
        title: 'Precisión de los resultados',
        html: '<p>El reconocimiento de texto nunca es perfecto. Los resultados pueden contener errores, sobre todo con letra a mano, fotos de baja calidad, texto pequeño y diseños complejos. Las palabras por revisar y el nivel de confianza son una orientación, no una garantía. Revisa siempre el texto antes de confiar en él, y ten especial cuidado con los números, nombres, importes y cualquier cosa con consecuencias legales, médicas o financieras. Eres responsable del uso que hagas de los resultados.</p>',
      },
      {
        id: 'enhanced-reading',
        title: 'Lectura mejorada',
        html: '<p>Cuando se ofrece, la Lectura mejorada envía la página que confirmes, a través de nuestro servidor, al modelo Claude de Anthropic. Es opcional, está limitada a un número de páginas por visitante y día, y puede modificarse, limitarse o retirarse en cualquier momento. Al usarla, también te comprometes a no enviar contenido que infrinja la <a href="https://www.anthropic.com/legal/aup" rel="noopener">política de uso de Anthropic</a>.</p>',
      },
      {
        id: 'our-content',
        title: 'Nuestro contenido y el software de código abierto',
        html: '<p>El diseño, los textos y los gráficos del sitio, así como el nombre y el logotipo de {site}, nos pertenecen a nosotros o a nuestros licenciantes. Puedes enlazar libremente a cualquier página. El motor de reconocimiento de texto y otros componentes son software de código abierto que se ofrece con sus propias licencias, aplicables a dichos componentes; los principales se enumeran en la página <a href="/about">Sobre nosotros</a>.</p>',
      },
      {
        id: 'third-parties',
        title: 'Enlaces y otros servicios',
        html: '<p>El sitio enlaza a otros sitios web y depende de servicios externos, como jsDelivr y, para la Lectura mejorada, Anthropic. No los controlamos y no somos responsables de su contenido ni de sus prácticas; se aplican sus propios términos y políticas.</p>',
      },
      {
        id: 'no-warranty',
        title: 'Exclusión de garantías',
        html: '<p>El servicio es gratuito y se ofrece «tal cual» y «según disponibilidad». En la máxima medida permitida por la ley, no ofrecemos garantías de ningún tipo, expresas o implícitas, incluidas las garantías de comerciabilidad, idoneidad para un fin determinado, exactitud y no infracción.</p>',
      },
      {
        id: 'liability',
        title: 'Limitación de responsabilidad',
        html: '<p>En la máxima medida permitida por la ley, no somos responsables de ningún daño indirecto, incidental, especial, consecuencial o punitivo, ni de ninguna pérdida de datos, beneficios, ingresos o negocio, que se derive del uso que hagas del sitio o de la imposibilidad de usarlo. Nuestra responsabilidad total por cualquier reclamación relacionada con el sitio se limita a 50 dólares estadounidenses o su equivalente en tu moneda.</p><p>Nada de lo dispuesto en estos términos limita ni excluye la responsabilidad que no pueda limitarse ni excluirse por ley, como la responsabilidad por fraude, por negligencia grave o conducta dolosa, o por muerte o lesiones personales causadas por negligencia.</p>',
      },
      {
        id: 'suspension',
        title: 'Suspensión del acceso',
        html: '<p>Podemos limitar, suspender o bloquear el acceso al sitio o a funciones del servidor como la Lectura mejorada, por ejemplo para frenar abusos o para proteger el servicio. Puedes dejar de usar el sitio en cualquier momento.</p>',
      },
      {
        id: 'changes',
        title: 'Cambios en estos términos',
        html: '<p>Podemos actualizar estos términos de vez en cuando. Cuando lo hagamos, cambiaremos la fecha que aparece al principio de esta página y, si el cambio es importante, lo indicaremos en el sitio antes de que entre en vigor. Si sigues usando el sitio después de un cambio, aceptas los términos actualizados.</p>',
      },
      {
        id: 'governing-law',
        title: 'Legislación aplicable',
        html: '<p>Estos términos se rigen por la legislación del país en el que tenga su establecimiento {operator}, sin tener en cuenta sus normas sobre conflictos de leyes. Si actúas como consumidor, conservas la protección que te otorgan las normas imperativas del país en el que vives y puedes ejercitar acciones ante los tribunales de tu lugar de residencia.</p>',
      },
      {
        id: 'general',
        title: 'Disposiciones generales',
        html: '<p>Si alguna parte de estos términos se considera inaplicable, el resto seguirá en vigor. Que no ejerzamos un derecho no significa que hayamos renunciado a él. Estos términos constituyen el acuerdo completo entre tú y nosotros en relación con el sitio. Si una traducción de estos términos difiere de la versión en inglés, prevalece la versión en inglés.</p>',
      },
      {
        id: 'contact',
        title: 'Contacto',
        html: '<p>¿Tienes preguntas sobre estos términos? Escribe a <a href="mailto:{email}">{email}</a> o usa la <a href="/contact">página de contacto</a>.</p>',
      },
    ],
  },
} satisfies Legal;

export default es;
