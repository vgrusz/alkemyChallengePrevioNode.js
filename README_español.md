Challenge aceleración Alkemy backend Node.js

Instrucciones para reproducir el proyecto:

    Clonar el repositorio

    Ejecutar npm install

    Crear una BD en mySql, y modificar los parámetros indicados en config.js
    modificando el archivo con los valores locales.

    Crear tres variables de entorno:

    Token de Sendgrid : SENDGRID_API_KEY

    Database password : DBPASSWORD

    Palabra secreta de JWT : JWT_SECRET_WORD

Testeos

    Ejecutar npm run test

    Breve explicación de testeos:

        El script de testeos es:

        node ./test/resetSeedDB.js && mocha ./test/createFirstUser.js ./test/test.js --exit

        resetSeedDB.js resetea la BD y la llena con una serie de registros de prueba

        createFirstUser.js crea un primer usuario, lo loguea y obtiene el token. Si falla esto fallarán varios del resto de los test, específicamente aquellos que dependen del token. El token es guardado en un archivo token.txt para ser usado por la siguiente tanda de tests.

        test.js ejecuta los test del resto de los endpoints. Por tratarse de un challenge he creado sólo un set de pruebas mínimo.

Deploy

    La aplicación fue desplegada en heroku.com

        https://vgalkemy00.herokuapp.com


    y la BD creada en

        https://remotemysql.com/

    También se documentaron los endpoints en Postman:

        https://documenter.getpostman.com/view/19651427/UVkiTeP6

Extras

    Endpoints con los datos completos de personajes y películas

        Dado que el challenge pide que se excluyan algunos campos en el listado de películas y personajes, también se crearon las rutas

            /rawMovies
            /rawCharacters

        que listan los personajes pero con toda su información completa.




    Posibilidad de crear un personaje y en el mismo acto asignarle películas

        Si en el body del endpoint post /character se agrega un campo "listaPelículas" con un array conteniendo los id de las peliculas en las que aparece ese personaje, se asignan esas películas en el momento de la creación del registro de ese personaje.

    Endpoint para llenar la BD con datos de testeo al momento de testear el deploy

        post /resetPopulateDB

        Este endpoint y su archivo deployRoutes.js deben ser eliminados luego de los testeos iniciales del deploy.

Consideraciones generales

    Se respetó el uso de castellano en los nombres de los campos de la base de datos y en los objetos de acuerdo a lo indicado en las instrucciones. Se usó inglés en todo lo que no estuviese explícitamente especificado en castellano.
