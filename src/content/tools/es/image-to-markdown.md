---
title: "Imagen a Markdown: convierte capturas a .md gratis"
description: "Convierte una imagen o captura a Markdown con títulos, listas, tablas y bloques de código para notas, documentación, wikis o prompts de IA. Funciona en tu navegador."
h1: "Convertir una imagen a Markdown"
intro: "Obtén Markdown de una captura, una diapositiva o la foto de una página: los títulos se convierten en líneas con #, las listas siguen siendo listas, las tablas pasan a tablas Markdown y el código va en bloques delimitados. Cópialo o descarga un .md."
navLabel: "Imagen a Markdown"
order: 13
preset:
  mode: document
  export: md
  sample: document
  camera: false
steps:
  - "Pega una captura con Ctrl+V o ⌘V, o suelta una foto o un escaneo de la página."
  - "Usa el modo Documento para prosa, o cambia «Leer como» a Tabla o Código si la imagen es sobre todo una tabla o código."
  - "Compara los títulos, los elementos de lista y las celdas con la imagen, y corrige las palabras subrayadas para revisar."
  - "Descarga un archivo Markdown (.md), o copia el texto y pégalo en tus notas, tu documentación o tu prompt."
faq:
  - q: "¿Qué tipo de Markdown genera?"
    a: "Markdown estándar para títulos y listas, además de tablas con barras verticales y bloques de código delimitados. Son compatibles con la mayoría de las apps de notas, wikis y herramientas de documentación que usan Markdown."
  - q: "¿Se conservan la negrita, la cursiva y los enlaces?"
    a: "No. El resultado marca la estructura, es decir, títulos, listas, tablas y código, no el estilo del texto. Añade el énfasis y los destinos de los enlaces a mano si los necesitas."
  - q: "¿Puedo convertir una diapositiva o la foto de una pizarra?"
    a: "Las diapositivas con texto impreso claro funcionan bien. Lo escrito en una pizarra es letra a mano, que cuesta más de leer, sobre todo si es ligada; la letra clara tipo imprenta da el mejor resultado."
  - q: "¿Se envía mi texto a algún sitio?"
    a: "No. La imagen se lee en tu dispositivo, en el navegador, y no se sube. Dónde pegues el Markdown después, por ejemplo en una herramienta de IA online, es decisión tuya."
  - q: "¿Puede convertir ecuaciones?"
    a: "Las ecuaciones impresas sencillas se pueden leer en el modo Matemáticas, que te da LaTeX. Las fracciones, las matrices y las disposiciones complejas suelen necesitar correcciones a mano."
related:
  - image-to-word
  - code-screenshot-to-text
  - image-to-excel
  - screenshot-to-text
---

## Por qué Markdown y no texto sin formato

El texto sin formato pierde la estructura. Un título parece una línea más, una lista se convierte en frases sueltas y una tabla acaba siendo un revoltijo de palabras en el orden equivocado. Markdown conserva esa estructura con caracteres normales, así que sobrevive cuando lo pegas casi en cualquier sitio.

El mismo resultado sirve en apps de notas que guardan Markdown, sitios de documentación, wikis, archivos README y chats con asistentes de IA. Sigue siendo legible como texto sin procesar, es fácil de editar a mano y los cambios se ven con claridad en el control de versiones.

## Cómo se escribe cada parte de la página

Cada tipo de contenido tiene su propia forma en Markdown:

| En la imagen | En el Markdown |
| --- | --- |
| Un título | Una línea que empieza con uno o más `#` |
| Viñetas | Líneas que empiezan con `- ` |
| Una lista numerada | Líneas que empiezan con `1.`, `2.`, etc. |
| Una tabla, leída en modo Tabla | Una tabla Markdown con barras verticales entre columnas |
| Código, leído en modo Código | Un bloque de código delimitado |

La captura de una lista de verificación corta en modo Documento podría quedar así:

```markdown
# Lista de verificación de la versión

Haz esto antes de etiquetar una versión nueva.

- Congelar la rama principal
- Actualizar el registro de cambios

1. Compilar el paquete
2. Ejecutar todas las pruebas
```

Las líneas cortadas dentro de un párrafo se unen, y las palabras partidas con guion al final de una línea se vuelven a juntar, de modo que el párrafo queda en una sola línea de Markdown en lugar de en varias rotas.

## Páginas que mezclan prosa, tablas y código

Cada imagen se lee en un solo modo a la vez, que se elige por separado para cada imagen. Esto importa en capturas que ponen un párrafo junto a una tabla, o en la página de un tutorial con un ejemplo de código en medio. El modo Documento está pensado para prosa, así que una tabla leída así suele salir como líneas de texto en lugar de una cuadrícula.

La solución es dividir la página. Haz una captura del texto y otra de la tabla o el código, pon cada una en el modo adecuado y arrástralas para ordenarlas. Después, la vista Documento completo combina todas las páginas en un archivo Markdown, o en un ZIP con un archivo por página.

Para imágenes con muchas tablas, [cómo extraer tablas de imágenes](/es/guides/how-to-extract-tables-from-images) explica cómo conseguir bien las filas y columnas. Para ejemplos de código, [captura de código a texto](/es/code-screenshot-to-text) explica qué conviene revisar, como los corchetes y los caracteres parecidos.

## Usar el Markdown en un prompt de IA

Pegar el texto en un chat con un asistente de IA, en lugar de la imagen, te da control sobre lo que ve. Puedes leer el texto antes, corregir palabras mal leídas, quitar cualquier cosa privada o irrelevante y mantener bien marcados los títulos, las listas y las tablas.

Una tabla pegada como Markdown conserva sus filas y columnas como texto, así que puedes referirte a ellas directamente en tu pregunta, por ejemplo «compara la columna de marzo con la de abril». Una lista numerada conserva sus números, así que «reescribe el paso 3» significa lo mismo para ti y para el asistente.

## Pulir el resultado antes de pegarlo

Unas cuantas comprobaciones rápidas dejan el Markdown más limpio:

- **Niveles de título.** Asegúrate de que el título de la página y los de las secciones han salido con el nivel que quieres. Añadir o quitar un `#` es rápido.
- **Listas numeradas que siguen en otra captura.** Una lista que continúa de una captura a la siguiente puede volver a empezar en 1, así que revisa los números después de combinar las páginas.
- **Saltos de línea que quieres conservar.** Para un poema, una dirección o la letra de una canción, desactiva la unión de líneas para que cada línea quede como estaba.
- **Errores repetidos.** Si una palabra se lee mal de la misma forma en todo el texto, buscar y reemplazar lo corrige de una vez.

Si prefieres terminar en un procesador de textos, [imagen a Word](/es/image-to-word) te da un .docx con los mismos títulos y listas.
