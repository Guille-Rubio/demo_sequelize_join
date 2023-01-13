const express = require('express');
const entradasRouter = express.Router();
const Entradas = require('../schemas/entradas');
const { populateEntradas } = require('../seeds/seed');


entradasRouter.get('/all', async (req, res) => {
    const entradas = await Entradas.findAll();
    res.status(200).json(entradas);
});
entradasRouter.get('/one', async (req, res) => {
    const { idEntrada } = req.body;
    const entrada = await Entradas.findAll({ where: { idEntrada } })
    res.status(200).json(entrada);
});

entradasRouter.post('/create', async (req, res) => {
    const newEntrada = req.body;
    const created = await Entradas.create(newEntrada);
    res.status(201).json(created);
});

entradasRouter.put('/update-one', async (req, res) => {
    const update = req.body;
    const updated = await Entradas.update(update, { where: { idEntrada: update.idEntrada } });
    res.status(200).json(updated);
});

entradasRouter.delete('/delete-one', async (req, res) => {
    const deleted = await Entradas.destroy({ where: { idEntrada: req.body.idEntrada } });
    res.status(200).json(deleted);
});

entradasRouter.delete('/delete-all', async (req, res) => {
    const deleted = await Entradas.destroy({
        where: {},
        truncate: false
    });
    res.status(200).json(deleted);
});

entradasRouter.get('/populate-entradas', async (req, res) => {
    try {
        const entradas = await populateEntradas();
        res.status(201).json(entradas);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
});

module.exports = entradasRouter;