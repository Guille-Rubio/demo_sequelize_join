const { db } = require('../config/sqlConnection');
const Autores = require('../schemas/autores');
const Entradas = require('../schemas/entradas');

const authorsSeed = [
    {
        idAuthor: "0a82a660-90dd-11ed-8006-9b14b60ebb20",
        name: "Guillermu",
        surname: "Rubix",
        email: "guillu@gmail.com"
    },
    {
        idAuthor: "0a82a660-90dd-11ed-8006-9b14b60ebb22",
        name: "Alejandru",
        surname: "Regex",
        email: "alejandru@gmail.com"
    },
    {
        idAuthor: "0a82a660-90dd-11ed-8006-9b14b60ebb23",
        name: "Bijra",
        surname: "Rivers",
        email: "birja@gmail.com"
    },
    {
        idAuthor: "0a82a660-90dd-11ed-8006-9b14b60ebb24",
        name: "Albertu",
        surname: "Henriques",
        email: "albertu@gmail.com"
    }
];

const entriesSeed = [
    {
        idAuthor: "",
        title: "Llega la fusión nuclear",
        content: "Obtenemos energía a través de la unión de nucleos de átomos. Energía barata y limpia para todos!"
    },
    {
        idAuthor: "",
        title: "La tregua de Navidad de los médicos de primaria da paso a un enero caliente en la sanidad",
        content: "Andalucía, Cataluña, Aragón, Comunidad Valenciana, Extremadura, Cantabria y Madrid negocian mejoras en las condiciones laborales de los facultativos para evitar huelgas"
    },
    {
        idAuthor: "",
        title: "El creador de los primeros bebés modificados genéticamente vuelve a la ciencia tras salir de la cárcel:",
        content: "El chino He Jiankui asegura sin pruebas que curará una enfermedad rara en tres años, y para ello busca la financiación de grandes fortunas. La comunidad científica le compara con los científicos nazis y ve su regreso con terror"
    },
    {
        idAuthor: "",
        title: "Los mejores ‘looks’ de la alfombra roja",
        content: "Un repaso a los estilismos de los invitados a la 80ª entrega de los premios de la Asociación de la Prensa Extranjera de Hollywood"
    },
    {
        idAuthor: "",
        title: "Los premios quedan bien con casi todos en su reparto de premios televisivos",
        content: "‘Colegio Abbott’, ‘The White Lotus’ y ‘La casa del dragón’ reciben los reconocimientos principales en la 80ª edición de los galardones"
    },
    {
        idAuthor: "",
        title: "El ejército ucranio desmiente la toma de Soledar anunciada por el grupo de mercenarios Wagner",
        content: "Kiev reconoce duros combates en la estratégica localidad minera del este del país, pero rechaza que los rusos la controlen por completo"
    },
    {
        idAuthor: "",
        title: "López Obrador a Biden: “Usted es el primer presidente de EE UU que no ha construido ni un metro del muro y se lo agradezco”",
        content: "Los ‘Three Amigos’ aprovechan la Cumbre de Líderes de América del Norte para hacerse fuertes ante las críticas que afrontan en sus países, empujar sus agendas regionales y relanzar su imagen"
    }
];

//Helper function
const populateDb = async (schema, seed) => {
    await schema.bulkCreate(seed);
};

const populateAutores = async () => {
    await populateDb(Autores, authorsSeed);
};
//Finds the first Author and adds all entries to that Author. 
const populateEntradas = async () => {
    const authorForEntries = await Autores.findOne({});
    const seed = entriesSeed.map(elm => {
        elm.idAuthor = authorForEntries.idAuthor
        return elm;
    });
    await populateDb(Entradas, seed);
};

const seeds = {
    populateAutores,
    populateEntradas
};

module.exports = seeds;