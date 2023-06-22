# Archivos necesarios para el correcto funcionamiento del sitio Web 

Para el funcionamiento del sitio web, son necesarios los archivos de la
carpeta */src*. En la carpeta */src/api* se encuentran los archivos
necesarios para comunicarse con la API, en */src/assets* se encuentran
los iconos e imágenes utilizados a través de la aplicación, en
*/src/stores* se encuentran los archivos necesarios para vincular
*pinia* con la API, y en */src/views* las vistas principales de cada
página del sitio. Por otro lado, en */src/components* se encuentra el
código de los componentes utilizados a través de la aplicación.

# Instructivo de instalación

A continuación se detallan las instrucciones para correr la aplicación
web en un entorno local.

-   Correr la API:

    1.  Descargar el archivo de la API y descomprimirlo

    2.  Instalar las dependencias necesarias con el comando *npm
        install*

    3.  Correr la API abriendo una terminal en la carpeta donde se
        encuentra y ejecutando el comando *npm start*

-   Correr el sitio web

    1.  Descargar el archivo y descomprimirlo

    2.  Instalar las dependencias necesarias con el comando *npm
        install*

    3.  Instalar *serve* con el comando *npm install -g serve*

    4.  Construir la página con *npm run build*. Se genera en la carpeta
        *dist*

    5.  Correr la página con el comando *serve -s dist*

    6.  Correr la API abriendo una terminal en la carpeta donde se
        encuentra y ejecutando el comando *npm start*

-   Notas

    -   La URL de la API se puede modificar en el archivo
        */src/api/api.js*
