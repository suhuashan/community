const config = require("../config/db.js");
const Sequelize = require("sequelize");

console.log("init sequelize...");


var sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 100000
    }
});

module.exports = sequelize;