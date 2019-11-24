const redis = require('./redis');
const sessionStore = require('../util/sessionStore');

// 存放sessionId的cookie配置
let sessionConfig = {
    key: 'sid',                   //cookie键名
    maxAge: 1000 * 60 * 20,       //cookie的失效时间,设置为20分钟
    httpOnly: true,               // 是否只用于http请求中获取
    overwrite: true,              // 是否允许重写
    rolling: false,
    renew: false,
    signed: true,
    store: new sessionStore(redis), 
}

module.exports = sessionConfig;
  