const log4js = require('log4js');
const config = require('./config.js');
const {formatError, formatRes} = require('./format_log');

log4js.configure(config);

let errorLogger = log4js.getLogger('error');
let resLogger = log4js.getLogger('response');

const logger = {
        // 封装错误日志
    errLogger (ctx, error, resTime) {
        if(ctx && error) {
            errorLogger.error(formatError(ctx, error, resTime))
        }
    },

    // 封装响应日志
    resLogger (ctx, resTime) {
        if(ctx) {
            resLogger.info(formatRes(ctx, resTime))
        }
    }
};

module.exports = logger;

