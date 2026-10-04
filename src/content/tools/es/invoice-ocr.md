---
title: "OCR de facturas: pasa los datos de facturas a Excel"
description: "Extrae número de factura, fechas, cliente, identificación fiscal, totales y líneas de facturas de proveedores a Excel o JSON. Se leen en tu dispositivo, sin subirlas."
h1: "OCR de facturas: lleva los datos de tus proveedores a tu contabilidad"
intro: "Lee una factura de proveedor escaneada, fotografiada o en PDF y obtén el número de factura, las fechas de emisión y vencimiento, el cliente, la identificación fiscal, los totales y las líneas. Revísalos junto a la imagen y descarga un Excel o un JSON."
navLabel: "OCR de facturas"
order: 8
preset:
  mode: receipt
  export: xlsx
  sample: receipt
  camera: false
steps:
  - "Suelta la factura como PDF, escaneo o foto; se leen todas las páginas de un PDF de varias páginas."
  - "Deja «Leer como» en Recibo o factura para que los datos del encabezado, los totales y las líneas se separen en campos."
  - "Comprueba el número de factura, la fecha de vencimiento y el total con la imagen, y corrige lo que se haya leído mal."
  - "Descarga un archivo de Excel (.xlsx) para tu registro de facturas, o JSON si procesas facturas con tus propios scripts."
faq:
  - q: "¿Puede leer facturas que llegan como PDF adjunto?"
    a: "Sí. Si una página del PDF ya contiene texto seleccionable, ese texto se toma directamente sin OCR, lo que evita errores de lectura. Los PDF escaneados se leen con OCR, página a página."
  - q: "¿Se conecta con mi programa de contabilidad?"
    a: "No. No hay conexión directa ni sincronización con ningún sistema contable. Descargas un archivo Excel, CSV o JSON, o copias los campos, y los llevas tú mismo a tu programa."
  - q: "¿Cuántas facturas puedo procesar a la vez?"
    a: "Un espacio de trabajo admite hasta 50 imágenes, de hasta 25 MB por archivo, y no hay límite diario. Para un lote más grande, hazlo por tandas."
  - q: "¿Puede leer facturas escritas a mano?"
    a: "Las facturas impresas se leen mejor. La letra a mano cuesta más, sobre todo la ligada, así que cuenta con revisar y volver a teclear los importes escritos a mano."
  - q: "¿Funciona en el teléfono?"
    a: "Sí. Ábrelo en el navegador del teléfono y usa la cámara para fotografiar una factura en papel. Ponla plana y haz que la página llene el encuadre."
  - q: "¿El mismo modo sirve para tickets de caja?"
    a: "Sí. El modo Recibo o factura también lee recibos, tickets y comprobantes de tarjeta, incluidos la propina, el importe pagado y el cambio."
related:
  - receipt-ocr
  - image-to-excel
  - pdf-to-text
  - image-to-json
---

## Para las facturas que llegan a tu mesa

Las cuentas por pagar empiezan tecleando. Una factura de proveedor llega como PDF adjunto, como escaneo o en papel, y antes de aprobarla y pagarla hay que pasar sus datos a una hoja de cálculo o a un sistema contable. El OCR de facturas lee el documento y coloca esos datos como campos junto a la imagen, así que tu trabajo pasa a ser revisar en lugar de volver a teclear.

Esta página es para dueños de pequeñas empresas, contables y cualquiera que procese facturas de proveedores. Si lo que quieres es que tu empresa te reembolse tus propios gastos, el [OCR de recibos](/es/receipt-ocr) encaja mejor.

## Los datos de la factura que se capturan y por qué importan

El modo Recibo o factura busca los datos de los que depende el proceso de pagos:

- **Número de factura.** Tu principal defensa contra pagar la misma factura dos veces. Revísalo con cuidado, porque una letra O leída como cero, o al revés, puede dejar pasar un duplicado.
- **Fecha de factura y fecha de vencimiento.** La fecha de vencimiento decide cuándo se paga la factura. Algunas facturas solo indican las condiciones de pago, como «Net 30» (a 30 días), sin fecha de vencimiento impresa. En ese caso, calcúlala tú a partir de la fecha de la factura.
- **Cliente (facturar a).** Confirma que la factura va dirigida a la empresa correcta, algo importante si gestionas más de una sociedad o si un proveedor todavía tiene una dirección antigua.
- **Identificación fiscal.** El número de IVA, GST u otro número fiscal del proveedor, que puede que necesites guardar para recuperar impuestos.
- **Subtotal, descuento, impuestos y total**, además de cualquier importe ya pagado.
- **Datos del proveedor**: nombre del comercio, dirección, teléfono, correo electrónico y sitio web.

Las líneas de la factura aparecen con cantidad, descripción, precio unitario e importe para cada una. Es lo que necesitas para cotejar una factura con una orden de compra o repartirla entre centros de coste. La imputación sigue siendo cosa tuya: la app lee lo que está impreso y no asigna cuentas ni categorías.

## Comprobaciones antes de registrar una factura

Las facturas impresas claras suelen leerse bien. Una factura también es un conjunto de números que tienen que cuadrar entre sí, lo que hace que los errores sean fáciles de detectar si los buscas:

- **Cada línea:** cantidad × precio unitario debería ser igual al importe de la línea.
- **Todas las líneas:** los importes de las líneas deberían sumar el subtotal.
- **El bloque final:** subtotal menos descuento más impuestos debería ser igual al total.
- **Formato de los números:** unos proveedores escriben 1.250,00 y otros 1,250.00. Asegúrate de que la marca decimal está en su sitio antes de que la cifra entre en tu contabilidad.
- **Fechas:** 04/05 significa 4 de mayo en algunos países y 5 de abril en otros. Lee la fecha con el formato del proveedor, no con el tuyo.

La imagen está junto a los campos, así que cuando algo no cuadra puedes ver qué estaba impreso realmente. También se muestra un nivel de confianza general (alto, medio o bajo). Una valoración alta no es una garantía, así que revisa el total y la fecha de vencimiento de cada factura de todos modos.

## Excel o JSON para tu contabilidad

La descarga en Excel (.xlsx) se abre directamente en una hoja de cálculo, lo que va bien para un registro de facturas o un libro que importas después a tu sistema contable. JSON encaja si procesas facturas con tus propios scripts; [imagen a JSON](/es/image-to-json) describe lo que contiene el archivo. También puedes copiar campos sueltos y pegarlos donde los necesites.

Para el lote de un mes, añade las facturas a un mismo espacio de trabajo y revisa cada página. Después exporta desde la vista Documento completo como un solo archivo o como un ZIP con un archivo por factura.

Algunas facturas ponen sus líneas en una tabla densa con columnas extra, como el código de artículo, el tipo impositivo o un descuento por línea. En ese caso, cambia «Leer como» a Tabla. Obtienes toda la cuadrícula como filas y columnas editables sin volver a subir la factura, igual que con la herramienta [imagen a Excel](/es/image-to-excel).

## Las facturas de proveedores, en tu dispositivo

Las facturas llevan datos bancarios, números fiscales, precios y nombres de clientes, así que importa dónde se procesan. Image to Text App las lee en tu navegador, en tu propio dispositivo, con el motor de código abierto Tesseract. Los archivos no se suben a ningún servidor.

El historial está desactivado por defecto. Si lo activas, los resultados se quedan solo en este navegador, y puedes borrar uno o vaciarlos todos. Una cosa a tener en cuenta: «Copiar enlace» mete el texto extraído dentro del propio enlace, así que cualquiera a quien le envíes ese enlace podrá leer los datos de la factura. Para saber qué mirar en cualquier servicio de OCR online, consulta [¿es privado el OCR online?](/es/guides/is-online-ocr-private)
