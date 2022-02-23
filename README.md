Challenge accelleration Alkemy backend Node.js

    (Hay una versión en castellano de este archivo, ver README_español.md)

To reproduce project:

    Clone repository

    Execute npm install

    Create a DB in mySql, and modify parameters in config.js updating file with local values

    Create this three environment variables;

    Sendgrid token : SENDGRID_API_KEY

    Database password : DBPASSWORD

    JWT secret word : JWT_SECRET_WORD

Testing

    Execute npm run test

    Brief explanation of tests:

        Testing script is:

        node ./test/resetSeedDB.js && mocha ./test/createFirstUser.js ./test/test.js --exit

        resetSeedDB.js resets Db and fills it with testing values

        createFirstUser.js creates a first user, logins it and gets its token. If this fails, all subsequent tests based on this token will fail. The token is stored in file token.txt in order to be used in further tests.

        test.js executes the tests of the rest of the endpoints. Taking into account that this is only a challenge, only a few tests were created as sample.

Deploy

    This application is deployed in heroku.com

        https://vgalkemy00.herokuapp.com


    and DB is stored in

        https://remotemysql.com/

    Tests/endpoints were also documented in postman:

        https://documenter.getpostman.com/view/19651427/UVkiTeP6

Extras

    Endpoints with complete data of characters and movies:


        Since the challenge asks that some fields be excluded from the list of movies and characters, these routes were also created:

            get /rawMovies
            get /rawCharacters

        to get characters and movies with all its data.



    Possibility of creating a character and simultaneously assign its movies

        If a field "listaDePeliculas" containing an array with movies ids is added in the body of post /character endpoint, those movies will be automatically assigned to that character in the moment of its creation.

General comments

    The use of Spanish was respected in the names of the fields of the database and in the objects as indicated in the instructions. English was used in everything that was not explicitly specified in Spanish.
