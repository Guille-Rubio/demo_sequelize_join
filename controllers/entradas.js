const Entradas = require('../schemas/entradas');
const {populateEntradas} = require('../seeds/seed');


const obtenerEntradas = async (req, res) => {
    const entradas = await Entradas.findAll();
    res.status(200).json(entradas);
};

const obtenerEntradaPorId = async (req, res) => {
    const { idEntrada } = req.body;
    const entrada = await Entradas.findAll({ where: { idEntrada } })
    res.status(200).json(entrada);
};

const crearEntrada = async (req, res) => {
    const newEntrada = req.body;
    const created = await Entradas.create(newEntrada);
    res.status(201).json(created);
};

const actualizarUnaEntrada = async (req, res) => {
    const update = req.body;
    const updated = await Entradas.update(update, { where: { idEntrada: update.idEntrada } });
    res.status(200).json(updated);
};

const borrarUnaEntrada = async (req, res) => {
    const deleted = await Entradas.destroy({ where: { idEntrada: req.body.idEntrada } });
    res.status(200).json(deleted);
};

const borrarTodasLasEntradas = async (req, res) => {
    const deleted = await Entradas.destroy({
        where: {},
        truncate: false
    });
    res.status(200).json(deleted);
};

const poblarTablaEntradas = async (req, res) => {
    try {
        const entradas = await populateEntradas();
        res.status(201).json(entradas);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};



const entradas = {
    obtenerEntradas,
    obtenerEntradaPorId,
    crearEntrada,
    actualizarUnaEntrada,
    borrarUnaEntrada,
    borrarTodasLasEntradas,
    poblarTablaEntradas



};

module.exports = entradas;