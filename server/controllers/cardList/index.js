const Sequelize = require('sequelize');
const { SuccessModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;
const List = model.list;

const getCardList = async (ctx) => {
    let { limit, offset } = ctx.request.body;
        allList = await List.findAll(),
        cardList = await List.findAll({ 
            attributes: [
                [Sequelize.col('user.userName'), 'author'],
                'title', 'content', 'views', 'time', 'id'
            ],
            include: [{
                model: User,
                as: 'user',
                attributes: []
            }],
            raw:true,
            offset: Number(offset), 
            limit: Number(limit)}
        );
    ctx.body = new SuccessModel({
        list: cardList,
        total: allList.length
    });
}

module.exports = {
    'POST /article/list': getCardList
}