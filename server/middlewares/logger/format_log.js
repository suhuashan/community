/*
 * @Author: suhuashan
 * @Date: 2019-10-28 12:40:48
 * @LastEditTime: 2019-11-04 12:46:09
 * @LastEditors: Please set LastEditors
 */
//获取请求客户端ip
function getClientIp (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

// 判断是移动端还是pc端
function isMobile (userAgent) {
    return /Mobile/.test(userAgent) ? 'Mobile' : 'PC';
}


let formatError = (ctx, err,costTime) => {
    let {method, url, body} = ctx;
    return {
        method, url, body, costTime, err,
        referer: ctx.request.headers['referer'],
        userAgent: isMobile(ctx.request.headers['user-agent']),
        ip: getClientIp(ctx.req)    
    };
}
let formatRes = (ctx,costTime) => {
    let {method, url, body, response} = ctx;
    return {
        method, url, body, costTime, response,
        referer: ctx.request.headers['referer'],
        userAgent: isMobile(ctx.request.headers['user-agent']),
        ip: getClientIp(ctx.req)    
    };
}

module.exports = {formatError, formatRes}