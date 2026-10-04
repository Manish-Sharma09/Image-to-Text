---
title: "Cómo extraer tablas de imágenes a Excel o Google Sheets"
description: "Convierte la foto o captura de una tabla en celdas: cómo funciona el OCR de tablas, recortes, tablas sin bordes y celdas combinadas, revisión de números, CSV o XLSX."
summary: "Cómo reconstruye el reconocimiento de tablas las filas y columnas a partir de una imagen, cómo ayudarle y cómo revisar los números antes de que lleguen a Excel o Google Sheets."
published: 2026-10-03
tool: image-to-excel
order: 5
---

Si pasas un OCR normal por la imagen de una tabla, obtienes líneas de texto, con las columnas separadas por unos cuantos espacios si tienes suerte. Pégalo en Excel y todo acaba en la columna A. Para obtener celdas de verdad, la herramienta tiene que reconstruir la estructura de la tabla, no solo leer sus palabras.

Esta guía explica cómo funciona, qué lo complica y cómo revisar el resultado antes de fiarte de él.

## Cómo funciona el reconocimiento de tablas

Un motor de OCR devuelve cada palabra junto con su posición en la imagen. El reconocimiento de tablas usa esas posiciones para deducir dónde están las filas y las columnas.

- **Las filas** salen del solapamiento vertical. Las palabras cuyos bordes superior e inferior coinciden pertenecen a la misma fila. Una buena herramienta admite una ligera inclinación, de modo que una fila que se desvía un poco a lo largo de la página sigue unida.
- **Las columnas** salen del espacio vacío. La herramienta busca canales verticales de espacio en blanco que atraviesen la mayoría de las filas. Cada franja entre dos canales se convierte en una columna.
- **Las líneas que abarcan toda la tabla**, como un título o una nota debajo, se apartan al decidir dónde están las columnas, para que no unan dos columnas.
- **La fila de encabezado** suele reconocerse porque son palabras situadas encima de columnas de números.

Lo fundamental es que la alineación importa más que los bordes. Una tabla bien alineada sin ninguna línea puede salir perfecta, mientras que una tabla apretada con todas las líneas de cuadrícula puede salir mal si las columnas están muy juntas.

## Recorta hasta la tabla

Todo lo que hay en la imagen participa en la detección de columnas, así que lo más útil que puedes hacer es recortar ajustándote a la tabla.

- **Quita lo que la rodea.** Los párrafos de encima, las notas al pie, los números de página, las barras laterales y una columna de texto vecina añaden palabras en lugares que confunden el recuento de columnas.
- **Una tabla por imagen.** Si una página tiene dos tablas, recórtalas y léelas por separado.
- **Divide las tablas muy anchas.** Si tienes que reducir una tabla ancha para que quepa en una sola foto, el texto puede quedar demasiado pequeño para leerse. Captúrala en dos mitades y conserva en ambas una columna identificativa, como nombres o fechas, para poder alinearlas de nuevo en la hoja de cálculo.
- **Tablas largas en varias páginas.** Lee cada página, pega los resultados uno debajo de otro y borra las filas de encabezado repetidas.

Si la tabla está en una foto del teléfono tomada en ángulo, enderézala primero. Las columnas inclinadas o que convergen son mucho más difíciles de encontrar que las que bajan rectas por la página.

## Tablas sin bordes

Muchos informes y extractos no usan ninguna línea de cuadrícula. Funcionan cuando hay un hueco claro entre columnas. Los problemas aparecen cuando no lo hay:

- Una columna de texto alineada a la izquierda junto a una columna de números alineada a la derecha puede dejar apenas un hilo de espacio entre ellas, y las dos se leen como una sola.
- Los puntos guía, como los «........» de un índice, se leen como filas de puntos.
- Las filas sombreadas alternas reducen el contraste en una de cada dos líneas. Pasar a escala de grises y subir el contraste ayuda.

Si dos columnas se funden, normalmente puedes separarlas en el resultado en lugar de empezar de nuevo. En la cuadrícula de tablas de Image to Text App puedes editar celdas y añadir o quitar filas y columnas antes de copiar.

## Celdas combinadas y de varias líneas

Las tablas reales rara vez tienen una cuadrícula perfecta, y algunas estructuras hay que arreglarlas a mano.

- **Encabezados que abarcan varias columnas.** Un encabezado como «2026» situado sobre cuatro columnas trimestrales acaba en una sola celda. Decide si repetirlo en cada columna o convertirlo en un encabezado de dos filas en la hoja de cálculo.
- **Texto en varias líneas.** Cuando el texto de una celda ocupa una segunda línea, puede salir como una fila extra con casi todas las celdas vacías. Sube el texto a la fila de arriba y borra la sobrante.
- **Celdas vacías.** Las celdas en blanco son lo más difícil para la detección basada en posiciones, porque no hay ninguna palabra que medir. Revisa las filas con huecos para asegurarte de que los valores posteriores no se han desplazado una columna a la izquierda.
- **El texto de encabezado girado** y las **tablas dentro de tablas** normalmente hay que rehacerlos a mano.

## Revisa los números

Una tabla suele estar llena de cifras que alguien va a sumar o usar para decidir algo, así que vale la pena dedicar unos minutos a revisarla.

- **Usa los totales.** Si la tabla tiene una fila de total, suma la columna en tu hoja de cálculo y compárala. Una diferencia te indica que mires con más atención, y es mucho más rápido que revisar cada celda.
- **Cuenta las filas.** Asegúrate de que el resultado tiene el mismo número de filas que el original.
- **Busca dígitos parecidos.** 0 y O, 1 y l y 7, 5 y S, 8 y B. Una letra en una columna de números es fácil de detectar, porque la hoja de cálculo tratará esa celda como texto.
- **Vigila los puntos decimales.** Un punto tenue puede desaparecer y convertir 12.50 en 1250. Una coma y un punto también pueden intercambiarse.
- **Revisa los números negativos.** Los signos menos son pequeños y fáciles de perder. Excel lee como negativos los números entre paréntesis, como (1,200), que suele ser lo que quería decir el original.
- **Ten en cuenta el formato numérico.** En muchos países 1.234,56 significa lo mismo que 1,234.56. Si tu hoja de cálculo tiene una configuración regional distinta a la del documento, los números pueden convertirse en texto o en un valor equivocado.

## Llevar la tabla a Excel o Google Sheets

El camino más sencillo es copiar y pegar. Las tablas copiadas como datos con formato, como la copia de la vista de tabla de Image to Text App, se pegan en Excel y Google Sheets como celdas separadas. Haz clic en la celda superior izquierda donde quieras la tabla y pega.

Antes de pegar, protege las columnas que a las hojas de cálculo les gusta «corregir»:

- **Los ceros iniciales** de códigos postales, números de teléfono e identificadores de cuenta se pierden cuando el valor se trata como número.
- **Los números largos** se convierten en notación científica, y Excel solo conserva 15 dígitos significativos, así que un identificador de 16 dígitos cambia sin avisar.
- **Los códigos cortos** como 3-4 o 1/2 pueden convertirse en fechas.

Da formato de Texto a esas columnas antes de pegar, o pega los valores y corrige el formato después. En Google Sheets, Ctrl+Shift+V (⌘+Shift+V en Mac) pega los valores sin formato.

## ¿CSV o XLSX?

Si descargas un archivo en lugar de copiar, el formato importa.

**CSV** es texto sin formato: una fila por línea, con comas entre las celdas. Casi cualquier programa puede importarlo, lo que lo convierte en la opción adecuada para pasar datos a un programa de contabilidad, una base de datos o un script. Pero no guarda formato y solo tiene una hoja, y el programa que lo abre adivina qué es cada valor, que es donde fallan los ceros iniciales y las fechas. Los caracteres que no son del inglés básico, como la ñ o las tildes, también pueden salir mal si el programa supone una codificación de texto equivocada. En Excel, importar con Datos > Desde el texto/CSV te permite elegir UTF-8 y definir los tipos de columna en lugar de dejar que Excel adivine.

**XLSX** es el formato propio de Excel, y se abre directamente en Excel, Google Sheets y otras apps de hojas de cálculo. Úsalo cuando las personas vayan a abrir la tabla y trabajar con ella.

Una regla sencilla: XLSX para personas, CSV para otros programas. La herramienta [imagen a Excel](/es/image-to-excel) ofrece los dos, además de una copia que se pega directamente en una hoja.

## Antes de empezar, busca el origen

Si la tabla viene de un informe en PDF o de una página web, puede que el original contenga datos reales. Prueba a seleccionar texto en el PDF o comprueba si el sitio ofrece una descarga. Si la tabla de verdad solo existe como imagen, haz que la imagen sea lo más nítida y recta posible; [cómo obtener resultados de OCR precisos](/es/guides/how-to-get-accurate-ocr-results) explica los detalles. Y si te interesan las posiciones de las palabras que hacen posible todo esto, [cómo funciona el OCR](/es/guides/how-ocr-works) explica de dónde salen.
