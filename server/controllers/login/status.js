const { SuccessModel, ErrorModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;

const getUserStatus = async (ctx) => {

    if (!ctx.session.userId) {
        ctx.body = {
            code: 401,
            message: "登录已过期，请重新登录"
        };
    } else {
        res = await User.findAll({
            attributes: [['userType', 'auth'], ['userName', 'user']],
            where: {
                userAcco: ctx.session.userId,
            }
        });
        if (res.length) {
            ctx.body = new SuccessModel(...res, '获取用户成功');
        }
    }
}

module.exports = {
    'GET /user/status': getUserStatus,
}