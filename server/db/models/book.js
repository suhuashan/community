let Sequelize = require("sequelize");
let sequelize = require("../index.js");

const Book = sequelize.define(
    "book",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        bookName: Sequelize.STRING,
        bookAuthor: Sequelize.STRING,
        userId: Sequelize.INTEGER
    },
    {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true
    }
);

Book.associate = function (models) {
    models.book.belongsTo(models.user,{
        foreignKey: 'userId',
        targetKey: 'id'
    });
};

module.exports = Book;

