const moment = require('moment');

 /**
 * @description: 时间格式化 
 * @returns {String} YYYY-MM-Do
 */
function getFormatTime () {
    return moment().format('YYYY-MM-DD');
}

exports.getFormatTime = getFormatTime;