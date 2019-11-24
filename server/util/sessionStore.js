/**
 * @description: redis的存储
 */

const TTL = 1200;             //redis的有效时间，单位为秒，默认20分钟

function getSession(sid) {
    return `${sid}`
}

class sessionStore {
    constructor (client) {
        this.client = client
    }

    async get (sid) {

        let id = getSession(sid)
        let result = await this.client.get(id)
        if (!result) {
            console.log('cookie无效');
            return null
        } else {
            try{
                return JSON.parse(result)
            }catch (err) {
                console.error(err)
            }
        }
    }

    async set (sid, value, ttl) {
        let id = getSession(sid)

        try {
            let sessStr = JSON.stringify(value)
            if(ttl && typeof ttl === 'number') {
                await this.client.set(id, sessStr, "EX", TTL)
            } else {
                await this.client.set(id, sessStr)
            }
        } catch (err) {
            console.log('session-store', err)
        }
    }

    async destroy (sid) {
        let id = getSession(sid)
        await this.client.del(id)
    }
}

module.exports = sessionStore