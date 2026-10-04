---
title: "Imagen a Excel: pasa la foto de una tabla a hoja de cálculo"
description: "Convierte una captura o foto de una tabla en una hoja de cálculo editable. Corrige celdas en una cuadrícula, pega en Excel o Google Sheets, o descarga XLSX o CSV."
h1: "Convertir imagen a Excel"
intro: "Suelta una captura o foto de una tabla y obtén filas y columnas que puedes editar, pegar en Excel o Google Sheets, o descargar como XLSX o CSV. La imagen se lee en tu dispositivo y nunca se sube."
navLabel: "Imagen a Excel"
order: 6
preset:
  mode: table
  export: xlsx
  sample: table
steps:
  - "Añade una imagen de la tabla y recórtala para que solo queden la tabla y su fila de encabezado."
  - "Compara la cuadrícula editable con la imagen, corrige celdas y añade o quita filas y columnas donde haga falta."
  - "Copia la tabla y pégala en Excel o Google Sheets, donde se coloca en filas y columnas."
  - "O descarga la tabla como archivo de Excel (.xlsx) o CSV."
faq:
  - q: "¿Se pega en Excel o Google Sheets como una tabla de verdad?"
    a: "Sí. Al copiar desde la cuadrícula, cada valor va a su propia celda cuando pegas en Excel o Google Sheets, en lugar de quedar en un único bloque de texto."
  - q: "¿Puedo corregir errores antes de exportar?"
    a: "Sí. Puedes editar cualquier celda y añadir o quitar filas y columnas en la cuadrícula, y después copiar o descargar la tabla corregida."
  - q: "¿Funciona con tablas sin bordes?"
    a: "Sí. Las columnas se deducen de los huecos que hay entre ellas, así que los bordes no hacen falta. Las columnas muy juntas son las que más probablemente haya que separar a mano."
  - q: "¿Qué pasa con las celdas combinadas?"
    a: "El valor de una celda combinada, como un encabezado que abarca varias columnas, aparece en una sola celda. Vuelve a combinar las celdas en tu hoja de cálculo si necesitas el mismo diseño."
  - q: "¿Se conservan las fórmulas?"
    a: "No. Una imagen solo muestra los resultados de las fórmulas, así que los totales aparecen como números sin más. Añade las fórmulas en tu hoja de cálculo si las necesitas."
  - q: "¿Puedo extraer una tabla de un PDF?"
    a: "Sí. Añade el PDF, abre la página que tiene la tabla y cámbiala al modo Tabla. Las páginas con texto real se toman directamente y las escaneadas se leen con OCR."
  - q: "¿Se suben mis datos?"
    a: "No. La tabla se lee en tu navegador, en tu dispositivo, algo importante para extractos, listas de precios y otras cifras que prefieres guardar para ti."
related:
  - pdf-to-text
  - screenshot-to-text
  - invoice-ocr
  - image-to-json
---

Volver a teclear una tabla es lento y es fácil equivocarse en un dígito. Imagen a Excel lee la tabla de una imagen y te da una cuadrícula editable de filas y columnas, lista para pegar en una hoja de cálculo o descargar como archivo.

## Tablas que vale la pena convertir

- **Tablas en PDF e informes** que no se copian bien y salen como una sola columna revuelta cuando lo intentas
- **Paneles y páginas web** que muestran datos pero no ofrecen exportación
- **Listas de precios, tarifas, horarios y calendarios**, impresos o en pantalla
- **Clasificaciones, resultados y tablas de ligas deportivas**
- **Tablas impresas** en libros, apuntes y manuales, fotografiadas con el teléfono
- **Extractos bancarios y listas de movimientos** que necesitas en una hoja de cálculo sin enviarlos a un sitio web

## Cómo encuentra filas y columnas el modo Tabla

El modo Tabla alinea las palabras en filas y encuentra las columnas a partir del espacio vacío que corre de arriba abajo entre ellas. Eso significa que una tabla no necesita bordes ni líneas de cuadrícula para leerse bien; importa mucho más una alineación limpia que las líneas.

Cuando añades una imagen, Image to Text App suele reconocer una tabla por sí solo y muestra una etiqueta como «Parece una tabla». En esta página el modo Tabla ya está seleccionado. Si lo que añadiste resulta ser texto normal, cambia de modo sin volver a añadir la imagen.

## Preparar la imagen

- **Recorta hasta la tabla.** Los títulos, notas y pies de página encima o debajo de una tabla pueden confundir la disposición de las columnas. Conserva la fila de encabezado y deja fuera el resto.
- **Endereza las fotos de tablas impresas.** Las columnas tienen que bajar rectas por la página. Para una tabla fotografiada en ángulo, usa el enderezado de cuatro esquinas para que las filas queden niveladas y las columnas rectas. La Mejora automática corrige sola una ligera inclinación.
- **Divide las tablas muy grandes.** Si una tabla es muy ancha o larga y el texto es diminuto, haz dos o tres capturas por secciones a un tamaño legible, convierte cada una y apílalas en tu hoja de cálculo.

## Tablas que necesitan más cuidado

**Celdas combinadas.** Un encabezado que abarca varias columnas, o una etiqueta que cubre varias filas, aparece en una sola celda, a menudo en la columna donde empieza. Después de pegar, vuelve a combinar las celdas en Excel o Sheets si necesitas el diseño original.

**Tablas sin bordes con huecos estrechos.** Cuando dos columnas están muy juntas, pueden leerse como una sola. Añade una columna en la cuadrícula y mueve los valores, o sepáralos después en tu hoja de cálculo.

**Texto que ocupa varias líneas dentro de una celda.** Una descripción larga en dos líneas puede parecer dos filas. Image to Text App intenta volver a unir ese texto en su fila. Si una fila sigue partida, sube el texto y borra la fila sobrante.

**Facturas y recibos.** Si tu imagen es una factura y no una tabla simple, el modo Recibo o factura suele ser mejor opción. Lee el nombre del comercio, las fechas y los totales además de las líneas de artículos. Consulta [OCR de facturas](/es/invoice-ocr).

## Revisa los números antes de fiarte de ellos

Los valores de los que el motor no estaba seguro aparecen subrayados. En las tablas, los sospechosos habituales son 0 y O, 1 y l, 5 y S, y 8 y B, además de los puntos y comas decimales, que son diminutos y se pierden fácilmente en una imagen borrosa. Los signos menos y los números negativos escritos entre paréntesis también merecen un segundo vistazo.

Una comprobación rápida después de pegar: suma una columna en tu hoja de cálculo y compárala con la fila de total del original. Si coinciden, es muy probable que la columna esté bien.

## XLSX, CSV o copiar y pegar

- **Copiar y pegar** es lo más rápido cuando añades la tabla a una hoja que ya tienes abierta.
- **Excel (.xlsx)** es el formato predeterminado aquí, un archivo que se abre directamente en Excel.
- **CSV** es un formato simple que casi cualquier programa puede importar, incluidos Google Sheets y las bases de datos.

Algo que conviene saber sobre CSV: cuando Excel abre un archivo CSV con doble clic, adivina el tipo de cada columna. Elimina los ceros iniciales de cosas como códigos postales y números de cuenta, y puede convertir algunos valores en fechas. Usa la importación Desde el texto/CSV de Excel para definir esas columnas como texto, o usa la descarga XLSX.

La misma tabla también se puede descargar como JSON para usarla en código; consulta [imagen a JSON](/es/image-to-json). Para profundizar en las tablas difíciles, lee [cómo extraer tablas de imágenes](/es/guides/how-to-extract-tables-from-images).
