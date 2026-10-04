---
title: "Imagen a JSON: extrae texto, tablas y campos de recibos"
description: "Convierte una imagen a JSON con el texto reconocido, las celdas de tablas o los campos y artículos de recibos de cada página. Útil para scripts, datos y pruebas."
h1: "Convertir una imagen a JSON"
intro: "Obtén el texto de una imagen como JSON estructurado: una entrada por página con su modo de lectura y su texto, más las celdas de las tablas o los campos y artículos de los recibos cuando la página los tiene. Todo se lee en tu navegador."
navLabel: "Imagen a JSON"
order: 14
preset:
  mode: auto
  export: json
  sample: receipt
  camera: false
steps:
  - "Añade una o varias imágenes; «Leer como» empieza en Automático y elige un modo para cada imagen, que puedes cambiar."
  - "Cambia una página a Tabla o a Recibo o factura si quieres celdas o campos con nombre en el JSON en lugar de texto sin formato."
  - "Corrige en el editor cualquier texto, celda o campo mal leído antes de exportar."
  - "Descarga el JSON de una sola página, o desde la vista Documento completo para tener todas las páginas en un archivo."
faq:
  - q: "¿Puedo convertir muchas imágenes a JSON a la vez?"
    a: "Sí. Un espacio de trabajo admite hasta 50 imágenes, de hasta 25 MB por archivo. Descarga desde la vista Documento completo para obtener un archivo JSON con todas las páginas, o un ZIP con archivos separados."
  - q: "¿Qué campos de recibo pueden aparecer en el JSON?"
    a: "Nombre del comercio, dirección, teléfono, correo electrónico, sitio web, número de recibo o factura, fecha, hora, fecha de vencimiento, facturar a, identificación fiscal, subtotal, descuento, impuestos, propina, total, importe pagado y cambio. Los artículos tienen cantidad, descripción, precio unitario e importe."
  - q: "¿El texto conserva títulos y listas?"
    a: "Sí. En las páginas leídas en modo Documento o Letra a mano, el texto usa Markdown ligero: # para títulos, - para viñetas y 1. para elementos numerados. Las páginas de código conservan el código fuente tal como se leyó."
  - q: "¿El modo Automático elige siempre la estructura correcta?"
    a: "No siempre. Muestra lo que cree que es la imagen, como una tabla o un recibo, y puedes cambiar de modo sin volver a subirla. El JSON sigue el modo que elijas."
  - q: "¿Puedo obtener CSV o Excel en su lugar?"
    a: "Sí. El mismo resultado se descarga como CSV o Excel (.xlsx), que es más sencillo si solo necesitas una tabla o un recibo en una hoja de cálculo."
related:
  - receipt-ocr
  - invoice-ocr
  - image-to-excel
  - image-to-markdown
---

## Qué contiene el archivo JSON

El archivo describe un documento formado por páginas, una por cada imagen que añadiste, en el orden en que las pusiste. Todas las páginas llevan los mismos datos básicos, y el detalle adicional depende del modo en que se leyeron:

- **Todas las páginas:** su título (tomado del nombre del archivo), el modo en que se leyeron y su texto.
- **Páginas de tabla:** las filas de la tabla, cada una como una lista de celdas, igual que la cuadrícula que ves en el editor.
- **Páginas de recibo y factura:** una lista de campos, cada uno con una clave, una etiqueta legible y un valor, además de una lista de artículos.
- **Páginas de código:** la etiqueta del lenguaje de programación, como Python o SQL, cuando se reconoció.

La exportación usa el resultado tal como lo dejaste en el editor, así que las correcciones que hagas antes de descargar quedan en el archivo.

## Un ejemplo resumido de un recibo

Así se ve una página leída en modo Recibo, recortada a unos pocos campos y artículos:

```json
{
  "title": "lunch-receipt",
  "createdAt": "2026-10-03T12:30:00.000Z",
  "pages": [
    {
      "title": "lunch-receipt",
      "mode": "receipt",
      "text": "Corner Cafe\n2 Flat white 3.50 7.00\n...",
      "receipt": {
        "kind": "receipt",
        "currency": "USD",
        "fields": [
          { "key": "merchant", "label": "Business", "value": "Corner Cafe" },
          { "key": "date", "label": "Date", "value": "03/14/2026" },
          { "key": "tax", "label": "Tax", "value": "1.12" },
          { "key": "total", "label": "Total", "value": "15.12" }
        ],
        "items": [
          { "description": "Flat white", "qty": "2", "unitPrice": "3.50", "amount": "7.00" },
          { "description": "Chicken wrap", "qty": "1", "unitPrice": "7.00", "amount": "7.00" }
        ]
      }
    }
  ]
}
```

La forma más rápida de ver la estructura completa es leer el recibo de ejemplo de esta página y descargarlo como JSON.

## Para qué sirve pasar una imagen a JSON

- **Flujos de gastos.** Lee un lote de recibos, revísalos, exporta un archivo JSON y deja que tu propio script pase fechas y totales a un libro de cuentas o una hoja de cálculo. La [página de OCR de recibos](/es/receipt-ocr) tiene consejos para conseguir fotos de recibos limpias.
- **Carga de datos.** Cuando los valores de formularios impresos, listas de precios o facturas tienen que ir a otro sistema, los campos con nombre son más fáciles de asignar que un bloque de texto.
- **Datos de prueba.** Los desarrolladores que crean una función que maneja recibos, tablas o texto escaneado pueden usar salidas reales de OCR, con sus errores realistas, como datos de prueba para analizadores y código de validación.
- **Archivo con estructura.** Guardar el modo y los campos junto al texto facilita volver a procesar escaneos antiguos más adelante.

Si lo que necesitas son filas y columnas en una hoja de cálculo, [imagen a Excel](/es/image-to-excel) te lleva ahí con menos pasos.

## Cómo tratar los valores en tu código

Los valores se conservan como el texto leído, exactamente como estaban impresos, en lugar de convertirse en números o fechas. Una fecha puede ser `03/14/2026` o `14.03.2026`, y un importe puede ser `1,250.00` o `1.250,00`, según de dónde venga el recibo. Analízalos con los formatos que esperas y marca lo que no encaje para que lo revise una persona.

Tampoco des por hecho que todos los campos están presentes. Un recibo sin línea de propina no tiene propina, y a un recibo desvaído le puede faltar la fecha. Usar la `key` en lugar de la posición en la lista hace que tu código siga funcionando cuando faltan campos.

También conviene comprobar los totales en el código: los importes de los artículos deberían sumar el subtotal, y el subtotal más los impuestos, menos cualquier descuento, debería coincidir con el total. Un descuadre es una buena señal de que algo se leyó mal.

## Procesado en tu navegador, sin API

La lectura se hace en tu navegador, en tu propio dispositivo, con el motor de código abierto Tesseract. Las imágenes no se suben, y el archivo JSON también se crea en tu dispositivo.

Eso también significa que no hay ninguna API a la que llamar ni ningún servidor al que enviar imágenes. Pasar una imagen a JSON es un paso manual: añades las imágenes, revisas los resultados y descargas el archivo. Encaja en tareas en las que una persona revisa los datos de todos modos, y no es una forma de procesar imágenes automáticamente en segundo plano. Si te interesa saber qué pasa entre la imagen y el texto, [cómo funciona el OCR](/es/guides/how-ocr-works) lo explica.
