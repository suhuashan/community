//不支持跨域请求，仅允许部分ip访问（ip白名单）
const ALLOW_ORIGIN = [
    'http://localhost:8000', 
    'http://localhost:8080'
];

module.exports = ALLOW_ORIGIN;