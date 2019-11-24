var Sequelize = require("sequelize");
var sequelize = require("../index.js");

const User = sequelize.define(
    "user",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        userName: Sequelize.STRING,
        userAge: Sequelize.INTEGER,
        password: Sequelize.STRING
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true
    }
);

User.associate = function (models) { 
    models.user.hasMany(models.book, {
        foreignKey: 'userId',
        targetKey: 'id'
    });
};
module.exports = User;

