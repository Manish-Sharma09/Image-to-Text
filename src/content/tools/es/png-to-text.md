---
title: "PNG a texto: extrae texto de imágenes PNG y capturas"
description: "Convierte imágenes PNG y capturas de pantalla en texto editable. Los PNG sin pérdida se leen limpios, el modo oscuro se procesa solo y todo se queda en tu navegador."
h1: "Convertir PNG a texto"
intro: "Suelta un PNG, o pégalo directamente desde el portapapeles, y copia el texto. Las capturas, las capturas en modo oscuro y los gráficos exportados se leen en tu dispositivo, sin subir nada."
navLabel: "PNG a texto"
order: 11
preset:
  mode: auto
  export: txt
  sample: chat
steps:
  - "Arrastra un PNG a la página, ábrelo con Ctrl+O (⌘O en Mac) o pega una imagen copiada con Ctrl+V o ⌘V."
  - "Recorta barras de herramientas, iconos y avatares para que en la imagen solo quede el texto que quieres."
  - "Si el PNG muestra código, una tabla o un documento con formato, cambia el modo de lectura para que coincida."
  - "Presiona Ctrl+Shift+C (⌘+Shift+C en Mac) para copiar todo el texto, o descárgalo como archivo .txt."
faq:
  - q: "¿Por qué las capturas en PNG suelen leerse bien?"
    a: "PNG es un formato sin pérdida, así que los bordes de las letras se mantienen nítidos en lugar de llenarse de las manchas que añade la compresión JPEG. Una captura en PNG con texto claro es de lo más fácil de leer."
  - q: "¿Qué pasa con un fondo transparente?"
    a: "Las zonas transparentes se rellenan de blanco antes de leer. El texto oscuro se lee con normalidad, pero el texto blanco o muy claro sobre fondo transparente desaparece, así que antes colócalo sobre un fondo oscuro en un editor de imágenes."
  - q: "¿Puede leer capturas en modo oscuro?"
    a: "Sí. La Mejora automática invierte el texto claro sobre fondo oscuro antes de leer y lo indica en la lista de pasos. También puedes activar Invertir colores tú mismo desde las herramientas manuales."
  - q: "¿Por qué los iconos se convierten en letras o símbolos al azar?"
    a: "Los iconos, los emojis y los símbolos de la interfaz pueden parecer letras o signos de puntuación para un motor de OCR. Recórtalos antes de leer o borra los caracteres sueltos en el editor después."
  - q: "¿Se sube mi PNG a algún sitio?"
    a: "No. Image to Text App lee la imagen con un motor de OCR que funciona en tu navegador, así que el archivo se queda en tu dispositivo."
  - q: "¿Puedo convertir varios archivos PNG a la vez?"
    a: "Sí. Añade hasta 50 imágenes por espacio de trabajo, de 25 MB cada una. Cada una se convierte en una página, y puedes copiarlas o descargarlas por separado o como un único documento combinado."
related:
  - screenshot-to-text
  - jpg-to-text
  - code-screenshot-to-text
  - image-to-markdown
---

PNG es el formato en el que guardan por defecto la mayoría de las herramientas de captura de Windows y Mac, y el que exportan casi todas las apps cuando guardas una diapositiva, un gráfico, un diagrama o un diseño como imagen. Por eso los PNG son la fuente más habitual de texto atrapado en una imagen: una pantalla de configuración, un chat, una diapositiva de una presentación, un gráfico con etiquetas o la página de un informe que alguien exportó para ti.

## Por qué PNG es el formato más amigable para el OCR

PNG es un formato sin pérdida. Cada píxel se guarda exactamente, así que los bordes nítidos de las letras se conservan, a diferencia de JPEG, que los emborrona un poco cada vez que guarda. Con el texto, la diferencia es real: un PNG con letra pequeña a menudo se lee limpio donde un JPEG de la misma imagen da varias palabras por revisar.

El punto débil de una captura no es el formato, sino el tamaño. El texto de las interfaces suele ser pequeño en pantalla, así que cada letra mide solo unos pocos píxeles de alto. La Mejora automática amplía el texto pequeño antes de leer, pero si vas a hacer la captura, ampliar antes (Ctrl y + en la mayoría de los navegadores y apps, ⌘ y + en Mac) le da al motor más con lo que trabajar.

En algunas pantallas, el texto se dibuja con bordes de color tenues para que se vea más suave. No los notarás a menos que amplíes mucho, y rara vez causan problemas. Si una captura se lee de forma extraña, prueba Escala de grises en las herramientas manuales.

## Fondos transparentes

Los PNG pueden tener zonas transparentes, algo habitual en logotipos, stickers, iconos y gráficos exportados desde herramientas de diseño. Antes de leer, Image to Text App rellena la transparencia de blanco, igual que la muestran la mayoría de los visores de imágenes.

Eso no supone ningún problema para el texto oscuro. Sí lo es para gráficos pensados para ir sobre un fondo oscuro: el texto blanco sobre fondo transparente se convierte en blanco sobre blanco, y no queda nada que leer. Invertir la imagen después no lo arregla, porque las letras y el fondo ya son del mismo color. Abre el PNG en un editor de imágenes y añade un fondo oscuro, o haz una captura mientras se muestra sobre una página oscura, y lee esa.

## Modo oscuro e interfaces de colores

Las capturas en modo oscuro se procesan automáticamente. La Mejora automática detecta el texto claro sobre fondo oscuro, lo invierte y lo indica en la lista de pasos para que sepas qué ha pasado. Mantén presionado Comparar para ver el original.

Los botones de colores, el texto gris de los campos vacíos y el texto sobre degradados son más difíciles, porque hay menos contraste entre las letras y el fondo. Si falta una etiqueta en el resultado, sube el Contraste o prueba Blanco y negro, y vuelve a leer con Ctrl+Enter (⌘+Enter en Mac).

## Quita el desorden de la interfaz

Las capturas suelen contener más que texto: iconos, fotos de perfil, barras de herramientas, barras de desplazamiento y emojis. Un motor de OCR intenta leerlo todo, así que una lupa puede salir como una «Q» y una marca de verificación como una «v». Recortar hasta la parte que necesitas es lo más útil que puedes hacer con una captura en PNG.

Las capturas de chats también mezclan nombres, horas y confirmaciones de lectura con los mensajes. Cada uno aparece en su propia línea, así que es fácil localizarlos y borrarlos.

## Elige el modo adecuado para lo que hay en el PNG

Image to Text App analiza la imagen y elige un modo de lectura, con una etiqueta como «Parece una tabla». Puedes cambiarlo cuando quieras sin volver a añadir la imagen.

- **Código de un editor o una terminal:** el modo Código mantiene la sangría y los espacios y convierte las comillas tipográficas en rectas. Consulta [captura de código a texto](/es/code-screenshot-to-text).
- **Una tabla u hoja de cálculo:** el modo Tabla te da una cuadrícula editable que se pega en Excel o Google Sheets. Consulta [imagen a Excel](/es/image-to-excel).
- **Una diapositiva o un documento:** el modo Documento une las líneas en párrafos y conserva los títulos y las listas con viñetas, ideal para descargar en [Markdown](/es/image-to-markdown) o Word.

## Límites que conviene conocer

El texto sobre fotos o fondos recargados, las letras estilizadas de los gráficos y las etiquetas en diagonal (como en el eje de un gráfico) son las fuentes habituales de errores en los PNG. Las palabras de las que el motor no estaba seguro aparecen subrayadas para que las compares con la imagen. Haz clic en cualquier línea y su lugar se ilumina en la imagen.

Si lo que tienes es una captura recién hecha y no un archivo guardado, puedes saltarte el paso de guardarla. La página [captura de pantalla a texto](/es/screenshot-to-text) explica cómo enviar una captura directamente al portapapeles y pegarla aquí.
