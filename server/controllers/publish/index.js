const { SuccessModel, ErrorModel } = require('../../util/response');
const { getFormatTime } = require('../../util/format');

const model = require('../../db/model');
const User = model.user;
const List = model.list;

const publishPost = async (ctx) => {
    let { title, content } = ctx.request.query,
        userId = ctx.session.userId;
    if (!title) {
        ctx.body = new ErrorModel('标题不能为空');
    }
    if (!content) {
        ctx.body = new ErrorModel('内容不能为空');
    }
    try {
        User.findOne({where:{userAcco: userId}}).then(async (userInfo) => {
            await List.create({
                title,
                content,
                views: 0,
                time: getFormatTime(),
                userId: userInfo.id
            });
            await userInfo.increment('article', {by: 1});
            // await User.update(
            //     {
            //         article: userInfo.article + 1
            //     },
            //     {
            //         where: {
            //             userAcco: userId
            //         }
            //     }
            // );
        });
        ctx.body = new SuccessModel('创建成功');
    } catch (e) {
        ctx.body = new ErrorModel('创建失败');
    }
}

const logout = async (ctx) => {
    ctx.session = null;
    ctx.body = new SuccessModel('退出成功');
}

module.exports = {
    'GET /publish/post': publishPost,
}