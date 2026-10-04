---
title: "Captura de código a texto: copia código de una imagen"
description: "Convierte una captura de código en texto para pegar y ejecutar. El modo Código mantiene la sangría, corrige las comillas y detecta el lenguaje, también en tema oscuro."
h1: "Copiar código de una captura de pantalla"
intro: "Pega una captura de código de un video, una diapositiva, un chat o un editor y obtén el código fuente en texto plano, con la sangría intacta, las comillas tipográficas convertidas en rectas y el lenguaje identificado. Los temas oscuros se procesan solos."
navLabel: "Captura de código a texto"
order: 15
preset:
  mode: code
  export: md
  sample: code
  camera: false
steps:
  - "Copia la captura al portapapeles y presiona Ctrl+V o ⌘V en cualquier parte de la página."
  - "Comprueba que «Leer como» indica Código; la etiqueta sobre el resultado muestra el lenguaje que ha reconocido."
  - "Repasa las palabras subrayadas para revisar, prestando especial atención a los corchetes, los ceros y los unos."
  - "Copia el código con Ctrl+Shift+C o ⌘+Shift+C, o descárgalo como archivo Markdown."
faq:
  - q: "¿Qué lenguajes de programación reconoce?"
    a: "Python, JavaScript, TypeScript, Java, C#, C/C++, Go, Rust, PHP, Ruby, SQL, HTML, CSS, JSON, shell y YAML. El código en otros lenguajes se lee igualmente con su sangría; simplemente no recibe una etiqueta de lenguaje."
  - q: "¿Conserva el resaltado de sintaxis?"
    a: "No, el resultado es texto sin formato. El código en color se lee igual y, cuando lo pegas en tu editor, el propio resaltado del editor se encarga del resto."
  - q: "¿Lee los números de línea del margen?"
    a: "Los números de línea del margen de un editor pueden leerse como parte del código. Recórtalos antes de leer o bórralos después."
  - q: "¿Puede leer código de un video en pausa?"
    a: "Sí, si el fotograma es nítido. Pausa en un fotograma a pantalla completa con la máxima calidad posible, porque el desenfoque y la compresión borran detalles pequeños como la diferencia entre un punto y una coma."
  - q: "¿Se sube mi código?"
    a: "No. La captura se lee en tu dispositivo, en el navegador, así que el código privado, y cualquier clave o token visible en la captura, no se envía a ningún servidor."
related:
  - screenshot-to-text
  - image-to-markdown
  - png-to-text
---

## Por qué el OCR normal destroza el código

El reconocimiento de texto general está pensado para prosa. Trata los espacios iniciales como ruido, une líneas que parecen ir juntas y deja pasar las comillas tal como las ve. Eso funciona para un párrafo, pero rompe el código: Python deja de ejecutarse si pierde la sangría, YAML cambia de significado y una sola comilla tipográfica copiada de una diapositiva convierte una cadena en un error de sintaxis.

El modo Código lee la imagen de otra manera:

- **Se conservan la sangría y los espacios**, línea a línea, para que los bloques anidados sigan anidados.
- **Las comillas tipográficas se convierten en rectas**, así que `“hello”` y `‘a’` vuelven como `"hello"` y `'a'`.
- **Se indica el lenguaje** cuando se reconoce, por ejemplo «Parece una captura de código Python», una señal rápida de que el modo encaja con la imagen.

Si descargas un archivo Markdown, el código va dentro de un bloque delimitado, listo para pegarlo en un README, una página de wiki o tus notas.

## Temas oscuros y sintaxis en color

La mayoría de los editores y terminales usan ahora temas oscuros, y los motores de OCR leen mejor el texto oscuro sobre fondo claro. La Mejora automática detecta el texto claro sobre fondo oscuro y lo invierte antes de leer, así que las capturas en modo oscuro no necesitan ninguna preparación por tu parte.

La sintaxis en color también suele ir bien. Los puntos más débiles son las partes de bajo contraste de un tema: comentarios grises sobre fondo gris oscuro o marcadores de espacios en blanco muy tenues. Si salen mal, prueba la escala de grises y un poco más de contraste, y luego cambia a la vista de la imagen limpia para comprobar que no se ha perdido nada.

## Caracteres que conviene revisar

Algunos caracteres son casi idénticos en muchas fuentes de programación, y una captura pequeña lo empeora. Estos son los sospechosos habituales:

- **0 y O**, sobre todo en nombres de variables y valores hexadecimales
- **1, l e I**, que en algunas fuentes se diferencian por un solo píxel
- **Corchetes y paréntesis**: `{` y `(`, `]` y `)`, además de los signos de mayor y menor en genéricos y etiquetas HTML
- **Puntuación**: `;` y `:`, `,` y `.`, y un acento grave leído como comilla recta
- **Letras unidas**: `rn` leído como `m`, o `cl` leído como `d`
- **Guiones bajos** que desaparecen o se convierten en espacios en nombres como `user_id`

Las fuentes de editor con ligaduras dibujan `!=`, `=>` o `>=` como un único símbolo, que puede no leerse como los caracteres que escribiste. Si la captura sale de tu propio editor, desactiva las ligaduras antes de hacerla.

La forma más rápida de revisar es pegar el código en un editor con linter o compilador. Los corchetes desparejados y los caracteres sueltos aparecen en segundos.

## Comprobar la sangría en Python y YAML

En los lenguajes en los que la sangría tiene significado, una línea desplazada un nivel puede seguir ejecutándose, pero hacer otra cosa. Un linter no siempre lo detecta, así que compara el anidamiento con la captura en cualquier bloque importante, como el cuerpo de un bucle o una clave anidada en un archivo de configuración.

Al hacer clic en una línea del resultado se ilumina su lugar en la imagen, lo que permite comprobar rápido dónde empezaba de verdad una línea. Si todo un bloque está desplazado, suele ser más rápido corregirlo en el editor con una sangría de bloque que línea a línea.

## Cómo conseguir una captura más limpia

Muchas veces obtendrás un mejor resultado volviendo a hacer la captura que corrigiendo caracteres a mano después:

- **Amplía antes de capturar.** El texto más grande tiene más píxeles por carácter, lo que ayuda sobre todo con la puntuación.
- **Captura solo el código.** Deja fuera barras laterales, pestañas y minimapas para que nada se mezcle con tus líneas.
- **Desactiva el ajuste de línea.** Una línea larga que el editor parte en dos se leerá como dos líneas.
- **Ojo con tabulaciones y espacios.** Una imagen no muestra cuál usaba el original, así que si tu proyecto usa tabulaciones, ejecuta tu formateador después de pegar.

Para capturas en general, incluidos chats y ventanas de error, [captura de pantalla a texto](/es/screenshot-to-text) y la guía sobre [cómo extraer texto de una captura de pantalla](/es/guides/how-to-extract-text-from-a-screenshot) cubren lo básico. Si el código forma parte de una página de documento más grande, [imagen a Markdown](/es/image-to-markdown) explica cómo separar la prosa y el código en capturas distintas.
