const model = require('../../db/model');
const User = model.user;

async function getLoginInfo (ctx) {
    let userId = ctx.request.body.userId,
        password = ctx.request.body.password,

        res = await User.findAll({
            where: {
                id: userId,
                password
            }
        });
        
    if (!res.length) {
        ctx.session.userId = userId;
        ctx.body = {
            code: 0,
            message: '登陆成功'
        };
    } else {
        ctx.body = {
            code: -1,
            message: '密码或账号错误，请重试'
        }
    }
}

async function login (ctx, next) {
    if (ctx.url === '/login') {
        await getLoginInfo(ctx);
        return;
    }
    if (!ctx.session.userId) {
        ctx.body = {
            code: 401,
            message: '用户已过期，请重新登录'
        };
        return;
    } 
    await next();

}

module.exports = login;