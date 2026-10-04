---
title: "Cómo extraer el texto de un recibo para gastos y registros"
description: "Captura recibos térmicos antes de que se borren, extrae totales, fechas y artículos con OCR, revisa los campos importantes y guarda registros que sirvan más adelante."
summary: "Por qué los recibos son difíciles de leer, cómo capturarlos antes de que se borren, qué campos revisar dos veces y cómo integrar el OCR de recibos en tu rutina de gastos."
published: 2026-10-03
tool: receipt-ocr
order: 7
---

Los recibos parecen sencillos, pero son de lo más complicado de pasar por OCR. La letra es pequeña y a menudo tenue, el diseño mezcla columnas y etiquetas, y el único número que te importa está rodeado de media docena más. Con buenos hábitos de captura y una revisión rápida de los campos clave, puedes convertir un montón de recibos en datos de gastos limpios.

## Por qué los recibos son difíciles de leer

### El papel térmico se borra

Casi todos los recibos de tiendas y restaurantes se imprimen en papel térmico, que se oscurece donde lo toca un cabezal de impresión caliente. Esa misma química lo hace frágil. El calor, la luz del sol, el roce y el contacto con algunos plásticos y aceites hacen que la impresión se borre o se oscurezca. Un recibo olvidado en la cartera o en un coche al sol puede volverse difícil de leer en cuestión de meses, y algunos se borran mucho antes.

### El diseño está abarrotado

Los nombres de los artículos están a la izquierda y los precios a la derecha, sin nada que los una salvo espacios. Los nombres se abrevian para que quepan («ORG BNNA 2LB»). Y en la parte inferior del recibo hay varios importes que se parecen: subtotal, impuestos, total, importe entregado, cambio y a veces una línea de propina. Leer las palabras es solo la mitad del trabajo; saber qué número es el total es la otra mitad.

### El papel no se queda plano

Los recibos se enrollan, se doblan y se arrugan, y cada pliegue proyecta una sombra sobre una línea impresa.

## Captura los recibos pronto, y planos

- **Captúralos el mismo día.** El mejor momento para fotografiar un recibo es antes de que vaya al bolsillo. La impresión borrada es el único problema que la edición de imagen solo puede arreglar en parte.
- **Alísalo primero.** Pon un recibo enrollado bajo un libro durante un minuto, o sujeta los extremos con dos objetos pequeños. Evita sujetarlo con los dedos, que proyectan sombras y tapan los bordes.
- **Usa un fondo oscuro.** Un recibo blanco sobre una mesa oscura tiene bordes claros, lo que facilita recortar y enderezar y evita que el fondo se mezcle con el texto.
- **Divide los recibos largos.** Un recibo largo del supermercado reducido para que quepa en una sola foto tiene un texto diminuto. Toma dos o tres fotos que se solapen o, si solo necesitas los totales, fotografía de cerca solo la parte inferior.
- **Rescata la impresión borrada con contraste.** Subir el contraste o pasar a blanco y negro puede recuperar una impresión gris tenue. Compara con el original para asegurarte de que los dígitos tenues no han desaparecido del todo.

Los consejos generales sobre iluminación, enfoque y ángulo están en [cómo obtener resultados de OCR precisos](/es/guides/how-to-get-accurate-ocr-results).

## Qué extrae el OCR de recibos

Un lector de recibos va más allá del texto sin formato e intenta etiquetar cada dato. El modo Recibo o factura de Image to Text App, que usa la página de [OCR de recibos](/es/receipt-ocr), busca el nombre del comercio, la dirección, el teléfono, el correo electrónico, el sitio web, el número de recibo, la fecha, la hora, la identificación fiscal, el subtotal, el descuento, los impuestos, la propina, el total, el importe pagado y el cambio, además de los artículos con cantidad, descripción, precio unitario e importe. Cada campo y cada artículo se pueden editar antes de copiar o descargar.

## Los campos que siempre hay que revisar

Por buena que sea la extracción, algunos campos merecen un segundo vistazo cada vez.

- **Total.** Confirma que tomó el total y no el subtotal, el importe entregado o el cambio. La comprobación más rápida es aritmética: el subtotal, menos cualquier descuento, más los impuestos y la propina, debería ser igual al total.
- **Fecha.** 03/04/2026 es el 4 de marzo en Estados Unidos y el 3 de abril en gran parte del mundo. Los recibos de viajes al extranjero son los culpables habituales. Los años de dos dígitos también pueden leerse mal.
- **Impuestos.** Los recibos pueden mostrar más de una línea de impuestos, o el porcentaje junto al importe del impuesto. Asegúrate de que en el campo de impuestos acabó el importe y no el porcentaje.
- **Nombre del comercio.** Muchos recibos imprimen el nombre de la tienda como logotipo, que es una imagen y no texto. El OCR puede tomar una razón social que aparece más abajo, o nada en absoluto. Escríbelo tú si hace falta.
- **Moneda.** Los símbolos son pequeños y a veces se leen mal: el € puede salir como C o E. En los recibos extranjeros, anota la moneda de forma explícita.
- **Puntos decimales.** Un punto tenue puede desaparecer y convertir 12.50 en 1250. La comprobación aritmética de arriba suele detectarlo.
- **Importes escritos a mano.** Los comprobantes de tarjeta de los restaurantes suelen llevar la propina y el total escritos a mano. La letra a mano se lee con menos fiabilidad que la impresa, así que revísalos a simple vista.

## Integrar los recibos en tu rutina de gastos

Un poco de organización hace que el OCR de recibos sea mucho más rápido a final de mes.

- **Un recibo por imagen.** Varios recibos en una sola foto se leen como uno solo, con los campos mezclados.
- **Agrupa tus recibos.** Fotografía los recibos de una semana, añádelos todos a la vez y revísalos de una sentada. En Image to Text App cada imagen se convierte en su propia página, así que puedes recorrerlas de una en una.
- **Elige la exportación que se adapte a tu sistema.** Una hoja de cálculo con una fila por recibo sirve para casi cualquier control personal o de pequeña empresa; descarga CSV o Excel. Si tienes que repartir un recibo entre gastos personales y de empresa, conserva también los artículos. JSON va bien para desarrolladores que importan los datos en otra app.
- **Nombra los archivos siempre igual.** Algo como `2026-05-12 Ferreteria 48.20.jpg` hace que un recibo sea fácil de encontrar sin abrirlo.
- **Concilia con tu extracto.** Cotejar los recibos con el extracto de tu tarjeta o tu banco detecta tanto errores de OCR como recibos que faltan.

Las facturas siguen una rutina parecida con algunos campos más, como el número de factura, la fecha de vencimiento y los datos del cliente; la página de [OCR de facturas](/es/invoice-ocr) está preparada para ellas. Para una hoja de cálculo continua con muchos recibos, [imagen a Excel](/es/image-to-excel) cubre la parte de las tablas.

## Conserva la imagen original

El texto extraído es una comodidad, no el registro. Guarda la foto o el escaneo junto a los datos, porque la imagen es lo que demuestra que el recibo era real y qué decía.

Las normas sobre si se aceptan copias digitales, y durante cuánto tiempo hay que conservar los registros, varían según el país y a veces según el tipo de gasto. Muchas administraciones tributarias aceptan copias electrónicas claras, pero en algunas situaciones se exige el original en papel. Consulta las indicaciones de tu administración tributaria o pregunta a un contable; esta guía no es asesoramiento fiscal ni legal. Las empresas también suelen tener sus propias normas, como exigir que se adjunte la imagen a cada solicitud de reembolso.

Si tienes que guardar los recibos en papel, consérvalos planos en un sobre, lejos de la luz y el calor. No los plastifiques: el calor de una plastificadora puede oscurecer el papel térmico y dejar la impresión ilegible.

## Recibos y privacidad

Los recibos contienen más información personal de lo que parece: los últimos dígitos de tu tarjeta, a veces tu nombre, una dirección de entrega o un número de cliente. Si eso te importa, elige una herramienta que lea la imagen en tu propio dispositivo, y recorta o tapa esos datos antes de compartir una imagen con nadie. [¿Es privado el OCR online?](/es/guides/is-online-ocr-private) explica en qué fijarte.
