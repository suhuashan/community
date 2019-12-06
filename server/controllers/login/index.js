const { SuccessModel, ErrorModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;

const login = async (ctx) => {

    let { account, password } = ctx.request.body;
        res = await User.findAll({
            where: {
                userAcco: account,
                userPass: password
            }
        });
    if (res.length) {
        ctx.session.userId = account;
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
    'POST /logout': logout
}