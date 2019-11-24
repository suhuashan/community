/**
 * @description: 生成加密密码
 */

module.exports = function (mingma) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(mingma).digest("base64");
    return password;
}