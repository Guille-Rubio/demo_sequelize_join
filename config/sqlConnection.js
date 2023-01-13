const { Sequelize } = require('sequelize');

const db = new Sequelize(`postgres://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@${process.env.SQL_HOST}/${process.env.SQL_USER}`);

const connectSQL = async () => {
    try {
        await db.authenticate();
        console.log('PostgreSQL database connected...');
    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

connectSQL();


module.exports = {
    connectSQL,
    db
}