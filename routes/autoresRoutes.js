const express = require('express');
const autoresRouter = express.Router();
const autoresControllers = require('../controllers/autores');


autoresRouter.get('/all', autoresControllers.obtenerAutores);
autoresRouter.get('/get-one/:idAuthor', autoresControllers.obtenerAutoresPorId);
autoresRouter.post('/create', autoresControllers.crearAutor);
autoresRouter.put('/update-one', autoresControllers.actualizarAutor);
autoresRouter.delete('/delete-one',autoresControllers.borrarAutor );
autoresRouter.delete('/delete-all', autoresControllers.borrarTodosLosAutores);
autoresRouter.get('/all-authors-entries', autoresControllers.obtenerUnAutorYTodasSusEntradas);
autoresRouter.get('/all-authors-all-entries', autoresControllers.obtenerTodosLosAutoresConSusEntradas);
autoresRouter.get('/populate-autores',autoresControllers.poblarTablaAutores );


module.exports = autoresRouter;