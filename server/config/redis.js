const Redis = require('ioredis');

const redisUrl = '127.0.0.1:6379';
const redis = new Redis(redisUrl);

module.exports =  redis;