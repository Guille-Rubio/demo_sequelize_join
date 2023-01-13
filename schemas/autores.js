const { db } = require('../config/sqlConnection');
const { DataTypes } = require('sequelize');

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


Autores.sync();

module.exports = Autores;


//A.hasOne(B) --> 1to1 FK in B
//A.belongsTo(B) --> 1to1 FK in A
//A.hasMany(B) --> 1toMany FK in B
//A.belongsToMany(B,{though:'crosstable'}) --> ManyToMany FK idA and idB in crosstable

