const { SuccessModel, ErrorModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;

const login = async (ctx) => {

    let userId = ctx.request.body.userId,
        password = ctx.request.body.password,
        res = await User.findAll({
            where: {
                id: userId,
                password
            }
        });
    if (res.length) {
        console.log(userId);
        ctx.session.userId = userId;
        ctx.body = new SuccessModel('登陆成功');
    } else {
        ctx.body = new ErrorModel('密码或账号错误，请重试');
    }
}

const logout = async (ctx) => {
    ctx.session = null;
    ctx.body = new SuccessModel('退出成功');
}

module.exports = {
    'POST /login': login,
    'GET /logout': logout
}