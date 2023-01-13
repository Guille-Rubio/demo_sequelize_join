const Autores = require('./autores');
const Entradas = require('./entradas');

Autores.hasMany(Entradas, { foreignKey: 'idAuthor' });//{foreignKey:'id_author'} works as well 