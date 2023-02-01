const Autores = require('../schemas/autores');
const Entradas = require('../schemas/entradas');
const { populateAutores } = require('../seeds/seed');

const obtenerAutores = async (req, res) => {
    const query = await Autores.findAll();
    res.status(200).json(query);
};

const obtenerAutoresPorId = async (req, res) => {
    const query = await Autores.findOne({ where: { idAuthor: req.params.idAuthor } });
    res.status(200).json(query);
};

const crearAutor = async (req, res) => {
    const query = await Autores.create(req.body);
    res.status(201).json(query);
};

const actualizarAutor = async (req, res) => {
    const update = await Autores.update(req.body, { where: { idAuthor: req.body.idAuthor } });
    res.status(200).json(update);
};

const borrarAutor = async (req, res) => {
    const deleted = await Autores.destroy({ where: { idAuthor: req.body.idAuthor } });
    res.status(200).json(deleted);
};

const borrarTodosLosAutores = async (req, res) => {
    const deleted = await Autores.destroy({
        where: {},
        truncate: false
    });
    res.status(200).json(deleted);
};

const obtenerUnAutorYTodasSusEntradas = async (req, res) => {
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
};


const obtenerTodosLosAutoresConSusEntradas = async (req, res) => {
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
};


const poblarTablaAutores = async (req, res) => {
    try {
        const autores = await populateAutores();
        res.status(201).json(autores);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};


const autores = {
    obtenerAutores,
    obtenerAutoresPorId,
    crearAutor,
    actualizarAutor,
    borrarAutor,
    borrarTodosLosAutores,
    obtenerUnAutorYTodasSusEntradas,
    obtenerTodosLosAutoresConSusEntradas,
    poblarTablaAutores,
};

module.exports = autores;
