const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize('image', 'root', '', {
    host: 'localhost',
    user: 'root',
    password: '',
    legging: false,
    dialect: 'mysql',
    database: 'image',
    connectionLimit: 10
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.log('Unable to connect to the database: ' + error);
    });
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.image = require('./image')(sequelize, DataTypes);
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Table created successfully....");
    })
    .catch((error) => {
        console.error("Error occurred while synchronizing the table:", error);
    });
