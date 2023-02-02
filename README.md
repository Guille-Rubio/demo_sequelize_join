## Sequelize and join demo

Express API REST using Sequelize. 

This api manages two SQL tables, _Autores_ and _Entradas_, for a blog. 

You can import the `postman_requests.json` file to Postman to make your http requests. 

Before using this api you must connect a PostgreSQL database.

### .env
```
SQL_PASSWORD=
SQL_HOST=
SQL_USER=
```
Once the database is connected you must populate the tables by making the following http requests: 

- GET http://localhost:3000/autores/populate-autores
- GET http://localhost:3000/entradas/populate-entradas

