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

### What is Sequelize?

Sequelize is a ORM (Object-Relational Mapping) that allows to interact with the database by means of JavaScript methods. 

### Setting up Sequelize

In this demo we will use Postgres, however Sequelize is compatible with other SQL dialects (mySQL, mariaDB, etc.)

### 1. Install Sequelize and Postgres packages
```bash
npm i sequelize
npm i pg
```

### 2. Connect to a Database (previously created)

- Create a file for connection 

```js
// config/sqlConnection.js

const { Sequelize } = require('sequelize');

//Creates a new Sequelize connection that represents the database
const db = new Sequelize(`postgres://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@${process.env.SQL_HOST}/${process.env.SQL_USER}`);

//Authenticates and actually connects our app to our database
const connectSQL = async () => {
    try {
        await db.authenticate();
        console.log('PostgreSQL database connected...');
    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

//Runs the connection
connectSQL();


module.exports = {
    connectSQL,
    db
}
```
More on [connections](https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database)

This file must be required in the entry point (`index.js`);




### 3. Create the schemas/models (Object Mapping). 

These will be our tables in our database.

```js
// schemas/autores.js

// Requires the object that represents our database
const { db } = require('../config/sqlConnection');

// Requires an object that contains the different data types in Sequelize
const { DataTypes } = require('sequelize');

// Defines the schema using the define method on our db object. Define has as first argument the name of the model and as second argument an object containing the name of the fields and their features. 

const Autores = db.define("Autores", {
    idAuthor: {
        field: 'id_author',
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },
    name: {
        field: 'name',
        type: DataTypes.STRING(35),
    },
    surname: {
        field: 'surname',
        type: DataTypes.STRING(35),
    },
    email: {
        field: 'email',
        type: DataTypes.STRING(40),
        unique: true
    },
    urlImage: {
        field: 'url_image',
        type: DataTypes.STRING(500),
        defaultValue: "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg"
    },
},
    {
        db,
        modelName: 'Autores',
        tableName: 'autores',
        timestamps: 'true',
    }
);

// This syncs our model with our database.
Autores.sync();

module.exports = Autores;

```

More on [model synchronization](https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization).


### 3. Relations / Associations

To define relations between tables.

```js
// schemas/associations.js

// import your schemas
const Autores = require('./autores');
const Entradas = require('./entradas');

//Define the relation between Schemas
Autores.hasMany(Entradas, { foreignKey: 'idAuthor' });//{foreignKey:'id_author'} works as well 

// this file must be required in the entry point before the connection
```


### 4. Querying our database with Sequelize

```js 
// Controller / model file 

// Require or controller model 
const Autores = require('../schemas/autores');

const crearAutor = async (req, res) => {
    // Call the appropriate method on the model 
    const query = await Autores.create(req.body);
    res.status(201).json(query);
};

```
More on [querying methods](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)


### 5. Eager loading (query with data associated from another table)

```js
// Require both schemas (requires the association in associations.js)

const Autores = require('../schemas/autores');
const Entradas = require('../schemas/entradas');

const obtenerUnAutorYTodasSusEntradas = async (req, res) => {
    try {
        // destructures idAuthor from the request body 
        const { idAuthor } = req.body;
        // Call the appropriate method
        const query = await Autores.findAll({
            // call the data in the other table
            include: {
                // refer the model
                model: Entradas,
                // refer the Foreign Key in the other model
                where: { idAuthor },
            }
        })
        res.status(200).json(query);

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message })
    }
};

```
More on [Eager Loading](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/).

