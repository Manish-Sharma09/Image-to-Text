---
title: "OCR de recibos: escanea tickets a CSV o JSON gratis"
description: "Convierte la foto de un recibo en el nombre del comercio, la fecha, los impuestos, el total y los artículos para tu informe de gastos. Funciona en tu navegador."
h1: "OCR de recibos: pasa tus tickets a datos de gastos"
intro: "Fotografía o suelta un recibo y obtén el nombre del comercio, la fecha, los impuestos, el total y cada artículo como campos que puedes revisar y editar. Descarga CSV para una hoja de cálculo o JSON para tus propias herramientas."
navLabel: "OCR de recibos"
order: 7
preset:
  mode: receipt
  export: csv
  sample: receipt
  camera: false
steps:
  - "Toma una foto del recibo sobre una superficie oscura y plana, o suelta un escaneo o una captura de un recibo recibido por correo."
  - "Deja «Leer como» en Recibo o factura para que el nombre del comercio, la fecha, los totales y los artículos vayan a campos separados."
  - "Compara la fecha, los impuestos y el total con la imagen que tienen al lado y corrige cualquier valor mal leído."
  - "Descarga CSV para una hoja de cálculo o una plantilla de gastos, o JSON si llevas tus propios registros con código."
faq:
  - q: "¿Se suben mis recibos a algún sitio?"
    a: "No. El recibo se lee en tu dispositivo, en el navegador, y la imagen no se envía a ningún servidor. El historial está desactivado por defecto y, si lo activas, los resultados se guardan solo en este navegador."
  - q: "¿Puedo escanear los recibos de todo un mes a la vez?"
    a: "Sí. Añade hasta 50 imágenes a un mismo espacio de trabajo y cada recibo se convierte en su propia página. Puedes revisarlos y descargarlos de uno en uno, o todos juntos en un archivo o un ZIP."
  - q: "¿Clasifica los recibos por categorías de gasto?"
    a: "No. Lee lo que está impreso en el recibo y deja las categorías, los centros de coste y las comprobaciones de políticas para ti o tu hoja de cálculo."
  - q: "¿Y si un recibo largo no cabe en una sola foto?"
    a: "Toma dos fotos que se solapen en lugar de una en la que el texto quede diminuto. Cada foto se convierte en su propia página, así que comprueba que los artículos de la zona solapada no se cuenten dos veces."
  - q: "¿Puedo usarlo con recibos y confirmaciones de pedido recibidos por correo?"
    a: "Sí. Sirve una captura de pantalla, y también un PDF. Si el PDF ya contiene texto seleccionable, ese texto se usa directamente sin OCR."
  - q: "¿Funciona en el teléfono?"
    a: "Sí. Puedes usar la cámara del teléfono directamente desde el navegador, y las fotos HEIC de iPhone se abren sin convertirlas antes."
  - q: "¿Necesito una cuenta o una app?"
    a: "No hace falta cuenta, registro ni instalación, y no hay límite diario para la lectura en el dispositivo."
related:
  - invoice-ocr
  - image-to-excel
  - image-to-json
  - photo-to-text
---

## De una cartera llena de recibos a un informe de gastos

La mayoría de los formularios de gastos piden los mismos pocos datos de cada recibo: dónde gastaste el dinero, cuándo, cuántos impuestos incluía y el total. Copiarlos a mano de papeles arrugados es lento y fácil de hacer mal, sobre todo después de un viaje que te dejó una docena de recibos de taxis, hoteles y comidas.

El modo Recibo lee la foto y ordena lo que encuentra en campos con nombre y líneas de artículos, así que compruebas cada valor con la imagen en lugar de teclearlo. Está pensado para gastos personales: pedir a tu empresa que te reembolse gastos de trabajo, controlar costes como autónomo o llevar el presupuesto de casa. Si procesas facturas de proveedores para un negocio, la [página de OCR de facturas](/es/invoice-ocr) trata las fechas de vencimiento, las identificaciones fiscales y las exportaciones para contabilidad.

## En qué se convierte un recibo escaneado

Un recibo sale en dos partes. Los campos contienen el resumen:

- **Comercio**, dirección y datos de contacto de la parte superior del recibo
- **Fecha** y **hora** de la compra, y el número de recibo si está impreso
- **Subtotal**, **descuento**, **impuestos**, **propina** y **total**
- **Importe pagado** y **cambio**, de las líneas de tarjeta o efectivo de la parte inferior

Las líneas de artículos contienen lo que compraste, cada una con cantidad, descripción, precio unitario e importe. Por ejemplo, una línea impresa como `2 Flat white 3.50 7.00` se divide en una cantidad de 2, la descripción «Flat white», un precio unitario de 3.50 y un importe de 7.00.

Puedes editar cada campo y cada artículo antes de exportar, así que un dígito equivocado se arregla en un momento y no es motivo para empezar de cero.

## Fotografiar papel térmico desvaído

Casi todos los tickets de caja se imprimen en papel térmico, que se borra con el calor, la luz del sol y el tiempo. La impresión gris y tenue es el motivo más común de que el texto de un recibo se lea mal, así que algunos hábitos ayudan:

- **Captura los recibos pronto.** Una foto tomada el día de la compra es mejor que una tomada al final del trimestre.
- **Usa un fondo oscuro y liso.** El papel blanco sobre una mesa oscura destaca con claridad y es fácil de recortar.
- **Alisa las curvas y los dobleces.** Sujeta los extremos o deja el recibo un minuto bajo un libro. Un pliegue que cruza una fila de números es una causa habitual de dígitos equivocados.
- **Evita reflejos y sombras.** La luz lateral, y no justo desde arriba, evita que el papel refleje un punto brillante y mantiene la sombra del teléfono fuera del texto.
- **Llena el encuadre.** Acércate lo suficiente como para que la letra más pequeña se lea con facilidad en la pantalla.

La Mejora automática iguala la iluminación y sube el contraste por sí sola, y enumera los pasos que aplicó. Si un recibo sigue viéndose tenue, sube el contraste o prueba blanco y negro, y luego cambia a la vista de la imagen limpia para asegurarte de que los dígitos más claros no han desaparecido. Un recibo fotografiado en ángulo se puede cuadrar con la herramienta de enderezar con cuatro esquinas. Hay consejos más generales en [cómo obtener resultados de OCR precisos](/es/guides/how-to-get-accurate-ocr-results).

## Revisa estos números antes de enviar

Los recibos impresos claros suelen leerse bien, pero un dígito mal leído en un total es el error que más importa en una solicitud de reembolso. Una comprobación rápida con la foto lo detecta:

1. **¿El total coincide con el papel?** Compáralo dígito a dígito con el total de la imagen.
2. **¿Cuadran los artículos?** Los importes de los artículos deberían sumar el subtotal. Si no, probablemente falta un artículo o se leyó mal.
3. **¿Está el punto decimal?** Un punto tenue o que falta puede convertir 12.50 en 1250.
4. **¿Es correcta la propina?** En los comprobantes de tarjeta de los restaurantes, la propina y el total final suelen escribirse a mano, y la letra a mano cuesta más de leer que la impresa. Tecléalos si parecen incorrectos.
5. **¿Es la fecha de compra?** Algunos recibos imprimen una segunda fecha, como el plazo de devolución. Asegúrate de que el campo de fecha tiene el día en que pagaste.

Las palabras de las que el motor no estaba seguro aparecen subrayadas, y se muestra un nivel de confianza general (alto, medio o bajo). Toma un nivel bajo como una razón para comparar todos los números, no solo el total.

## CSV o JSON para tus registros

CSV se abre en cualquier app de hojas de cálculo, así que es la forma más sencilla de pasar los datos de los recibos a una plantilla de gastos o una hoja de presupuesto. También tienes Excel (.xlsx) si tu plantilla es un libro de Excel. JSON va bien para quien usa sus propios scripts o herramientas; la [página de imagen a JSON](/es/image-to-json) muestra lo que contiene el archivo.

Cuando hayas añadido varios recibos, la vista Documento completo los reúne en el orden que elijas y los exporta como un solo archivo o como un ZIP con archivos separados. Para una explicación de principio a fin, consulta [cómo extraer el texto de un recibo](/es/guides/how-to-extract-text-from-a-receipt).
