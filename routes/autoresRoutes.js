const express = require('express');
const autoresRouter = express.Router();
const Autores = require('../schemas/autores');
const Entradas = require('../schemas/entradas');
const { populateAutores } = require('../seeds/seed');


autoresRouter.get('/all', async (req, res) => {
    const query = await Autores.findAll();
    res.status(200).json(query);
});

autoresRouter.get('/get-one/:idAuthor', async (req, res) => {
    const query = await Autores.findOne({ where: { idAuthor: req.params.idAuthor } });
    res.status(200).json(query);
});

autoresRouter.post('/create', async (req, res) => {
    const query = await Autores.create(req.body);
    res.status(201).json(query);
});

autoresRouter.put('/update-one', async (req, res) => {
    const update = await Autores.update(req.body, { where: { idAuthor: req.body.idAuthor } });
    res.status(200).json(update);
});

autoresRouter.delete('/delete-one', async (req, res) => {
    const deleted = await Autores.destroy({ where: { idAuthor: req.body.idAuthor } });
    res.status(200).json(deleted);
});

autoresRouter.delete('/delete-all', async (req, res) => {
    const deleted = await Autores.destroy({
        where: {},
        truncate: false
    });
    res.status(200).json(deleted);
});


autoresRouter.get('/all-authors-entries', async (req, res) => {
    try {
        const { idAuthor } = req.body;
        const query = await Autores.findAll({
            include: {
                model: Entradas,
                where: { idAuthor },
            }
        })
        res.status(200).json(query);

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message })
    }
});

autoresRouter.get('/all-authors-all-entries', async (req, res)=>{
    try {
        const query = await Autores.findAll({
            include: {
                model: Entradas,   
            }
        })
        res.status(200).json(query);

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message })
    }
});


autoresRouter.get('/populate-autores', async (req, res) => {
    try {
        const autores = await populateAutores();
        res.status(201).json(autores);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
});


module.exports = autoresRouter;