# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Intalación de libería](#3-intalación-de-librería)
* [4. Uso de la librería](#4-uso-de-la-librería)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen del proyecto

Es un proyecto en linea de comando ejecutado en `Node.js` que instala una librería, la cual permite
realizar un barrido a la ruta ingresada y buscar los archivos .md y validar vía HTTP cada link del
archivo en caso de requerirlo, de lo contrario solo muestra los links que encontró.

## 3. Intalación de librería

Para la instalación de la librería se deberá ejecutar el suguiente comando:

- Desde consola

```sh
npm i arrely.web-md-links
```

## 4. Uso de la librería

El módulo ofrece dos procesos: validar y/u obtener estadísticas de los links.

#### `md-links  <path> [options]`

##### Argumentos

* `path`: Se ingresa la ruta **absoluta** o **relativa** al **archivo** o al **directorio**.
* `options`: Solo se acepta la siguiente opción:
  - `-vl o --validate`: Determina si se desea validar via HTTP los links encontrados.
  - `-s o --stats`: Determina si se desea validar via HTTP los links encontrados.
  - `-vl -s o --validate --stats`: Muestra el conteo del total, los links únicos y los links inválidos.

##### Valor de retorno

En caso de recibir solo la `ruta` solo mostrará en consola los siguientes datos
para cada link encontrado :

* `href`: URL encontrada.
* `text`: Título del link.
* `file`: Ruta del archivo donde se encontró el link.

En caso de recibir `-vl o --validate` mostrará en consola los siguientes datos para cada link
encontrado :

* `href`: URL encontrada.
* `text`: Título del link.
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

En caso de recibir `-s o --stats` mostrará las estadísticas en consola :

* `Total`: Total de liks encontrados en la ruta.
* `Unique`: Total de links únicos encotrados en la ruta.

En caso de recibir `-vl -s o --validate --stats` mostrará las estadísticas en consola :

* `Total`: Total de liks encontrados en la ruta.
* `Unique`: Total de links únicos encotrados en la ruta.
* `Broken`: Total de links rotos encotrados en la ruta.

##### Ejemplos

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

##### Options

###### `--validate`

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

###### `--stats`

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

###### `--validate` y `--stats`

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
