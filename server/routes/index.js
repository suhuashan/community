const fs = require('fs');
const path = require('path');

/**
 * 添加控制器
 * @param router
 */
function addControllers(router) {
    // 先导入fs模块，然后用readdirSync列出文件
    // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
    let dirs = fs.readdirSync(path.resolve(__dirname, '../controllers'));
        
    
    dirs.forEach(item => {
        let files = fs.readdirSync(path.resolve(__dirname, '../controllers/', item));
        let js_files = files.filter((f) => {
                return f.endsWith('.js');
            });
        for (let f of js_files) {
            console.log(`process controller: ${f}...`);
            let mapping = require(path.resolve(__dirname, '../controllers/', item, f));
            addMapping(router, mapping);
        }
    });




}

/**
 * 添加路由
 * @param router
 * @param mapping
 */
function addMapping(router, mapping) {
    for (let url in mapping) {
        if (mapping.hasOwnProperty(url)) {
            if (url.startsWith('GET ')) {
                // 如果url类似"GET xxx"，下同
                let path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                let path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else if (url.startsWith('PUT ')) {
                var path = url.substring(4);
                router.put(path, mapping[url]);
                console.log(`register URL mapping: PUT ${path}`);
            } else if (url.startsWith('DELETE ')) {
                var path = url.substring(7);
                router.del(path, mapping[url]);
                console.log(`register URL mapping: DELETE ${path}`);
            } else {
                // 无效的URL:
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}


module.exports = (dir) => {
    let controllersDir = dir || 'controllers',
        router = require('koa-router')();

    addControllers(router, controllersDir);

    return router.routes();
};
