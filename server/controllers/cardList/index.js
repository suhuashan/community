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
            offset, 
            limit
        });
    ctx.body = new SuccessModel({
        list: cardList,
        total: allList.length
    });
}

const getHotPoint = async (ctx) => {
    let { limit, offset } = ctx.request.body;
    hotPoint = await List.findAll({
        attributes: [
            'title', 'views', 'id'
        ],
        offset, 
        limit
    });
    ctx.body = new SuccessModel({
        list: hotPoint
    });
}

const getHotWriter = async (ctx) => {
    let { limit, offset } = ctx.request.body;
    hotWriter = await List.findAll({
        attributes: [
            [Sequelize.col('user.userName'), 'writer'],
            [Sequelize.col('user.article'), 'article'],
            'id'
        ],
        include: [{
            model: User,
            as: 'user',
            attributes: []
        }],
        raw:true,
        offset, 
        limit
    });
    ctx.body = new SuccessModel({
        list: hotWriter
    });
}

module.exports = {
    'POST /home/article/list': getCardList,
    'POST /home/hot/point': getHotPoint,
    'POST /home/hot/writer': getHotWriter
}