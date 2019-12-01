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
        userAcco: Sequelize.STRING,
        userPass: Sequelize.STRING,
        article: Sequelize.INTEGER
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true,
        underscored: false
    }
);

User.associate = function (models) { 
    models.user.hasMany(models.list, {
        foreignKey: 'userId',
        targetKey: 'id'
    });
};
module.exports = User;

