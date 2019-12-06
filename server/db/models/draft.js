let Sequelize = require("sequelize");
let sequelize = require("../index.js");

const Draft = sequelize.define(
    "draft",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        time: Sequelize.STRING
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true,
        underscored: false
    }
);

Draft.associate = function (models) {
    models.draft.belongsTo(models.user,{
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
    });
};

module.exports = Draft;

