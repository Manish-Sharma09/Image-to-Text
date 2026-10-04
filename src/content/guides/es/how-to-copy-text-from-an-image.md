---
title: "Cómo copiar el texto de una imagen"
description: "Las formas más rápidas de copiar el texto de una foto, imagen o archivo de imagen en cualquier dispositivo, qué método va mejor en cada caso y cómo limpiar el texto pegado."
summary: "Una guía para cualquier dispositivo sobre cómo copiar texto de imágenes: comprueba si de verdad es una imagen, elige el método adecuado y arregla los saltos de línea al pegar."
published: 2026-10-03
tool: jpg-to-text
order: 2
---

El texto que hay dentro de una imagen no se puede seleccionar porque, para un ordenador o un teléfono, no es texto. Es una cuadrícula de puntos de colores que casualmente forman letras. Para copiarlo, algo tiene que leer esos puntos y deducir qué caracteres muestran. Ese proceso es el OCR (reconocimiento óptico de caracteres), y tienes más formas de usarlo de las que imaginas.

Esta guía te ayuda a elegir el método adecuado para la imagen que tienes delante y después explica cómo obtener un texto limpio al final del proceso.

## Primero, comprueba que de verdad es una imagen

Una cantidad sorprendente de «texto en imágenes» en realidad se puede seleccionar. Dedica diez segundos a comprobarlo antes de recurrir al OCR, porque copiar texto real siempre es exacto.

- **PDF.** Muchos PDF contienen texto real. Prueba a arrastrar sobre una frase o a buscar una palabra. Si el PDF es un escaneo, no obtendrás nada, y la solución es el OCR.
- **Páginas web.** Los títulos y botones con estilo pueden parecer gráficos, pero a menudo son texto normal. Prueba a seleccionarlo, o presiona Ctrl+F (⌘F en Mac) y busca una palabra.
- **Documentos y diapositivas.** Una imagen pegada en un archivo de Word o en una presentación es una imagen, aunque el texto que la rodea no lo sea.
- **La captura de pantalla de otra persona.** Si un compañero te envió una captura de una hoja de cálculo o un informe, pedirle el archivo original suele ser más rápido que cualquier conversión.

## Una guía rápida para decidir

Elige el método según la tarea:

- **Un número de teléfono, una dirección o una frase de una foto en tu teléfono.** Usa lo que viene integrado: Texto en vivo en iPhone, o Google Lens y Circle to Search en Android.
- **Texto de algo que tienes en la pantalla del ordenador.** Recortes o PowerToys en Windows, Texto en vivo en Vista Previa en Mac. La [guía de capturas de pantalla](/es/guides/how-to-extract-text-from-a-screenshot) tiene los pasos para cada plataforma.
- **Una página completa que quieres editar.** Usa una herramienta de OCR que conserve párrafos, títulos y listas, y exporta a Word.
- **Una tabla.** Usa una herramienta con reconocimiento de tablas para que las columnas se mantengan.
- **Un recibo o una factura.** Un modo para recibos extrae el total, la fecha y los artículos en lugar de un muro de texto.
- **Un montón de imágenes.** Usa una herramienta que lea un lote y combine los resultados en orden.
- **Letra a mano.** Cuenta con revisar y corregir más que con texto impreso.
- **Cualquier cosa confidencial.** Mejor un método que lea la imagen en tu propio dispositivo.

## Herramientas integradas: en qué destacan

Las funciones del teléfono y del ordenador, como Texto en vivo, Google Lens y Recortes, tienen varias cosas en común. Funcionan justo donde está la imagen, así que no hay que abrir ni subir nada. Son rápidas para cantidades pequeñas de texto.

Sus límites son igual de constantes. Solo copian texto sin formato, así que las tablas se aplanan en líneas y los títulos se convierten en frases normales. Los idiomas disponibles dependen de tu sistema operativo. Y no hay paso de revisión, así que no sabrás de qué palabras dudaba el motor hasta que encuentres tú mismo los errores.

## Usar una herramienta de OCR en el navegador

Una herramienta en el navegador requiere algo más de esfuerzo y te da más control. Los pasos son casi iguales en la mayoría de las herramientas.

1. **Mete la imagen.** Arrastra el archivo, usa el selector de archivos o pega una imagen que hayas copiado. En el teléfono, normalmente puedes tomar una foto directamente.
2. **Indica el idioma.** El OCR lee cada idioma con su propio modelo. Si el texto está en español, o mezcla inglés e hindi, díselo a la herramienta.
3. **Elige cómo leerlo.** Líneas simples, un documento con formato, una tabla o un recibo dan resultados distintos a partir de la misma imagen.
4. **Revisa el resultado junto a la imagen.** Comprueba los nombres, los números y todo aquello de lo que vayas a depender.
5. **Copia o descarga.** Copia para pegar rápido, o descarga un archivo si el texto va a ir a un documento o una hoja de cálculo.

[Image to Text App](/es) funciona así sin enviar la imagen a ningún sitio: la lectura se hace en tu navegador, elige un modo de lectura por ti y marca las palabras de las que está menos seguro para que sepas dónde mirar.

## Sacar imágenes de sitios complicados

A veces lo difícil es simplemente meter la imagen en una herramienta.

- **Una imagen de una página web.** Haz clic derecho sobre ella, elige Copiar imagen y pégala. Algunas herramientas también aceptan el enlace de la imagen: haz clic derecho, elige Copiar dirección de imagen y pega eso.
- **Una imagen dentro de un documento de Word o una presentación.** En Microsoft Word y PowerPoint, haz clic derecho en la imagen y elige Guardar como imagen para obtener un archivo aparte.
- **Una foto de iPhone.** Los iPhone guardan las fotos en HEIC por defecto, y algunos sitios web no pueden abrir ese formato. Usa una herramienta que lea HEIC o cambia el formato de la cámara en Ajustes.
- **Una imagen insertada en un correo.** Guárdala o descárgala antes. Copiarla directamente desde un programa de correo a veces te da un enlace a la imagen en lugar de la imagen en sí.
- **Un fotograma de un video.** Pausa en ese fotograma, pasa a pantalla completa para que el texto sea lo más grande posible y haz una captura de pantalla.

## Limpiar el texto pegado

El OCR reproduce el texto línea a línea, tal como aparece en la imagen. Es fiel, pero a menudo no es lo que quieres una vez que el texto está en otro sitio.

### Líneas cortadas

Un párrafo que en la imagen ocupaba cinco líneas se pega como cinco líneas separadas. Algunas herramientas pueden unir las líneas cortadas en párrafos antes de copiar. Si la tuya no puede y trabajas en Microsoft Word, Buscar y reemplazar lo resuelve manteniendo los saltos de párrafo reales:

1. Reemplaza `^p^p` (dos marcas de párrafo) por un marcador que no aparezca en el texto, como `###`.
2. Reemplaza `^p` por un solo espacio.
3. Reemplaza `###` por `^p`.

### Palabras partidas

Una palabra partida con guion al final de una línea en el original («infor- mación») sigue partida en el resultado. Busca un guion seguido de un espacio y corrige cada caso a mano, porque algunos guiones, como el de «teórico-práctico», tienen que quedarse.

### Formato no deseado

Pegar en un documento puede arrastrar las fuentes y el espaciado de donde copiaste. La mayoría de las apps tienen una opción para pegar como texto sin formato, a menudo Ctrl+Shift+V, que lo elimina. Úsala cuando solo quieras las palabras.

## Cuánto fiarte del resultado

El texto impreso claro en una imagen razonablemente nítida suele salir con mucha precisión. Los puntos problemáticos son previsibles: números, nombres, direcciones de correo, códigos de producto y cualquier cosa en una fuente pequeña o decorativa. Son justo las cosas con las que un diccionario no puede ayudar, y donde un solo carácter mal leído importa más.

Si te preguntas por qué el OCR confunde el 0 con la O, o «rn» con «m», [cómo funciona el OCR](/es/guides/how-ocr-works) lo explica de forma sencilla. Si el texto que copias va a convertirse en un documento que seguirás editando, consulta [cómo convertir imágenes en documentos editables](/es/guides/how-to-convert-images-to-editable-documents). Y para documentos de identidad, cartas del banco o cualquier otra cosa delicada, vale la pena leer [si el OCR online es privado](/es/guides/is-online-ocr-private) antes de elegir una herramienta.
