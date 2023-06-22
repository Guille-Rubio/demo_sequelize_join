const express = require('express');
const entradasRouter = express.Router();
const entradas = require('../controllers/entradas');


entradasRouter.get('/all', entradas.obtenerEntradas);
entradasRouter.get('/one/:id', entradas.obtenerEntradaPorId);
entradasRouter.post('/create', entradas.crearEntrada);
entradasRouter.put('/update-one', entradas.actualizarUnaEntrada);
entradasRouter.delete('/delete-one', entradas.borrarUnaEntrada);
entradasRouter.delete('/delete-all', entradas.borrarTodasLasEntradas);
entradasRouter.post('/populate-entradas', entradas.poblarTablaEntradas);

module.exports = entradasRouter;