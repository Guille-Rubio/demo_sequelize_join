const { db } = require('../config/sqlConnection');
const { DataTypes } = require('sequelize');

const Entradas = db.define("Entradas", {
    idEntry: {
        field: "id_entry",
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    idAuthor: {
        field: "id_author",
        type: DataTypes.UUID,
    },
    title: {
        field: "title",
        type: DataTypes.STRING(150),
    },
    content: {
        field: "content",
        type: DataTypes.STRING(1000),
    },
    date: {
        field: "date",
        type: DataTypes.DATE,
        defaultValue: new Date()
    },

}, {
    db,
    modelName: 'Entradas',
    tableName: 'entradas',
    timestamps: 'true',
});


Entradas.sync();

module.exports = Entradas;