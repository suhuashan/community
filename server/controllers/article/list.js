const { SuccessModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;
const Book = model.book;

const getArticleList = async (ctx) => {
    console.log(ctx.session);

    let id = ctx.request.query.id || '',
        data = await User.findAll({
        where: {
            id
        },
        include: [{
            model: Book
        }]
    })
    ctx.body = new SuccessModel(data);
}

module.exports = {
    'GET /article/list': getArticleList
}