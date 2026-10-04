---
title: "Cómo funciona el OCR, explicado de forma sencilla"
description: "Cómo convierte el OCR una imagen en texto: limpieza de la imagen, análisis del diseño, líneas y palabras, red neuronal, diccionarios y niveles de confianza."
summary: "Un recorrido sencillo por lo que pasa dentro de un motor de OCR, desde la limpieza de la imagen hasta el reconocimiento con redes neuronales, y por qué confunde el 0 con la O."
published: 2026-10-03
tool: photo-to-text
order: 4
---

El OCR, siglas en inglés de reconocimiento óptico de caracteres, es un software que mira una imagen y deduce qué caracteres contiene. Parece sencillo hasta que recuerdas qué es una imagen: una cuadrícula de puntos de colores. Nada en el archivo dice «esto es la letra A» ni «esta línea va antes que aquella». Todo eso hay que deducirlo.

Esta guía explica qué hace un motor de OCR moderno, con Tesseract como ejemplo. Tesseract es un motor de código abierto muy utilizado, desarrollado originalmente en Hewlett-Packard y mantenido después con el apoyo de Google, y es el motor que [Image to Text App](/es) ejecuta en tu navegador. Otros motores cambian en los detalles, pero las etapas son prácticamente las mismas.

## Las etapas de un vistazo

1. Limpiar la imagen para que el texto destaque.
2. Analizar el diseño para encontrar los bloques de texto y su orden.
3. Dividir los bloques en líneas, y las líneas en palabras.
4. Reconocer los caracteres de cada línea.
5. Usar el conocimiento del idioma para elegir entre las lecturas probables.
6. Puntuar la confianza de cada palabra y devolver el resultado.

## Limpiar la imagen

El reconocimiento funciona mejor con letras oscuras y nítidas sobre un fondo claro y liso, así que el primer trabajo es acercarse lo más posible a eso.

La **binarización** decide, para cada píxel, si es tinta o papel, y convierte la imagen en blanco y negro puros. El método clásico, el de Otsu, analiza la distribución del brillo en toda la imagen y elige el umbral único que mejor separa los dos grupos. Funciona bien con escaneos limpios. En una foto del teléfono con una sombra en una esquina, un único umbral falla: la parte en sombra se vuelve negra del todo o la parte clara pierde sus letras tenues. Los métodos adaptativos lo resuelven comparando cada píxel con su entorno en lugar de con toda la página.

El **enderezado** detecta si las líneas de texto están inclinadas y gira la imagen para que queden horizontales. Basta una inclinación de unos pocos grados para que una línea invada la de arriba, lo que arruina las etapas siguientes.

Otros pasos de limpieza eliminan motas y polvo del escáner, amplían el texto muy pequeño para que las letras tengan suficientes píxeles y invierten el texto claro sobre fondo oscuro. La documentación de Tesseract recomienda texto oscuro sobre fondo claro para las versiones actuales, y por eso muchas herramientas invierten las capturas en modo oscuro antes de leerlas.

## Analizar el diseño

Después, el motor averigua qué hay en la página: bloques de texto, imágenes, líneas, columnas separadas. También tiene que decidir el orden de lectura.

Este paso provoca algunos de los errores más desconcertantes. Si el motor no ve el hueco entre dos columnas, lee de lado a lado las dos y mezcla medias frases de cada una. Un pie de foto puede fundirse con el párrafo de debajo. Una tabla puede salir como un revoltijo de palabras más o menos en el orden correcto.

Los motores suelen permitir que el software que los usa indique qué tipo de entrada esperar, como una página completa, un solo bloque, una sola línea o texto disperso. Elegir bien importa: leer un recibo como si fuera la página de un libro puede dar peores resultados que leerlo como texto disperso.

## Encontrar líneas y palabras

Dentro de cada bloque, el motor busca las líneas de texto. Busca filas de tinta apoyadas en una línea base común y mide las proporciones de la línea: la altura de las minúsculas como la x, y hasta dónde llegan los ascendentes (b, d, h) y los descendentes (g, p, y).

Las palabras salen de los espacios. Los huecos entre palabras suelen ser más anchos que los huecos entre letras. Un espaciado de letras muy apretado puede fundir dos palabras en una, y el espaciado estirado del texto justificado puede partir una palabra en dos.

## Reconocer los caracteres

Los motores de OCR antiguos, incluido Tesseract hasta la versión 3, cortaban cada palabra en caracteres sueltos y comparaban cada forma con las formas que habían aprendido. Eso falla cuando las letras se tocan, como en una «rn» emborronada, o cuando una letra queda partida en trozos por una impresión tenue.

Tesseract 4, publicado en 2018, añadió un reconocedor basado en una red neuronal LSTM (memoria a corto y largo plazo). En lugar de recortar letras, lee una línea de texto completa como una secuencia, recorriéndola y estimando en cada paso la probabilidad de cada carácter posible. Como la red arrastra información a lo largo de la línea, puede usar las formas anteriores y posteriores a un carácter para decidir cuál es, igual que tú lees una letra emborronada fijándote en las de al lado.

La red aprende con ejemplos. Los modelos oficiales de Tesseract se entrenaron con grandes cantidades de texto representado en muchas fuentes, con un modelo distinto para cada idioma o escritura. Por eso importa elegir el idioma correcto: un modelo entrenado en inglés no tiene ni idea de cómo es una letra devanagari, y puede que no espere letras acentuadas como é o ñ.

## Conocimiento del idioma y diccionarios

El reconocedor no da una única respuesta. Produce muchas lecturas posibles de cada línea con sus probabilidades. Después, una búsqueda elige la mejor, orientada por una lista de palabras y por el conocimiento de qué combinaciones de letras son habituales en el idioma.

Esa orientación corrige mucho. Una «cnsa» borrosa se convierte en «casa» porque «casa» es una palabra y «cnsa» no. Pero también puede jugar en tu contra. Los códigos de producto, los apellidos, las abreviaturas y las palabras de otro idioma no están en la lista de palabras, así que el motor tiene menos ayuda con ellos y es más probable que se equivoque.

## Niveles de confianza

Para cada palabra, el motor también indica lo seguro que está, según lo claramente que su lectura preferida superó a las alternativas. Las herramientas usan este dato para marcar palabras que debes revisar.

Toma la confianza como una pista, no como una garantía. Una puntuación baja suele significar que algo va mal. Una puntuación alta suele significar que está bien, pero un motor puede equivocarse con total seguridad. Una «O» nítida dentro de un número de serie que debería ser un cero le parece perfectamente correcta.

## Por qué ocurren los errores

La mayoría de los errores de OCR siguen unos pocos patrones:

- **Caracteres parecidos.** 0 y O, 1 y l e I, 5 y S, 8 y B. En muchas fuentes sin serifa, una I mayúscula y una l minúscula son idénticas, así que incluso una persona necesita contexto.
- **Pares de letras parecidos.** «rn» leído como «m», «cl» como «d», «vv» como «w», y al revés.
- **Puntuación.** Las comas y los puntos son diminutos, así que el polvo se convierte en un punto y un punto decimal tenue desaparece.
- **Sin contexto en el que apoyarse.** Los códigos, identificadores, números de teléfono y direcciones de correo no tienen palabras del diccionario alrededor, así que cada carácter está solo.
- **Errores de diseño.** Columnas leídas de lado a lado, pies de foto mezclados con el texto, filas de una tabla desordenadas.
- **Texto que el modelo nunca aprendió.** Fuentes decorativas, logotipos estilizados, texto vertical y, sobre todo, letra a mano.

Casi todos se vuelven mucho menos frecuentes con una imagen más nítida, más grande y más recta. [Cómo obtener resultados de OCR precisos](/es/guides/how-to-get-accurate-ocr-results) explica qué cambiar.

## Qué pasa después del reconocimiento

La salida en bruto de un motor es una lista de palabras, cada una con su posición en la imagen y un nivel de confianza. Las apps construyen la estructura a partir de esas posiciones. Las palabras alineadas en columnas verticales se convierten en una tabla, como se explica en [cómo extraer tablas de imágenes](/es/guides/how-to-extract-tables-from-images). Las líneas con una fecha o un total después de una etiqueta se convierten en campos de un recibo. La distancia de cada línea al margen izquierdo se convierte en la sangría del código.

## OCR, ICR, HTR y modelos de IA

Puede que te encuentres con algunos términos relacionados. Tradicionalmente, **OCR** se refiere al texto impreso. **ICR** (reconocimiento inteligente de caracteres) se refiere a leer caracteres escritos a mano en letra de imprenta, normalmente uno por casilla en un formulario. **HTR** (reconocimiento de texto manuscrito) se refiere a leer escritura a mano continua, normalmente con redes neuronales entrenadas con muestras de escritura. Las diferencias prácticas se explican en [cómo pasar notas escritas a mano a texto](/es/guides/how-to-convert-handwritten-notes-to-text).

Algunos sistemas de IA más recientes leen el texto generándolo a partir de la imagen con un modelo de lenguaje grande. Pueden manejar bien entradas desordenadas, pero como generan texto fluido, un error puede parecer una palabra perfectamente verosímil que no está en la imagen. Uses el sistema que uses, compara con el original las partes que importan.
