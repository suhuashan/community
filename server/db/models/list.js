let Sequelize = require("sequelize");
let sequelize = require("../index.js");

const List = sequelize.define(
    "list",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        views: Sequelize.INTEGER,
        time: Sequelize.STRING,
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true,
        underscored: false
    }
);

List.associate = function (models) {
    models.list.belongsTo(models.user,{
        foreignKey: 'userId',
        targetKey: 'id'
    });
};

module.exports = List;

