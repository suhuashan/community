const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const cors = require('koa2-cors');
const session = require('koa-session');
const views = require('koa-views');

const logger = require('./middlewares/logger');
const upload = require('./middlewares/upload');
const routes = require('./routes');
const sessionConfig = require('./config/sessionConfig');
const allowOrigin = require('./config/allowOrigin');


const PORT = 8000;
const staticPath = './static';


const app = new Koa();

onerror(app);

// 配置跨域资源共享
app.use(cors({
    origin: function(ctx) {
      if (allowOrigin.includes(ctx.request.header.origin)) {
        return ctx.request.header.origin;
      }
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  })
);

// 使用session中间件
app.keys = ['suhuashan']
app.use(session(sessionConfig, app));

//解析post请求参数中间件
app.use(bodyParser({
    enableTypes:['json', 'form', 'text']
}));

//记录响应日志
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.resLogger(ctx, ms)
});

//静态资源中间件
app.use(static(
    path.join( __dirname,  staticPath)
));

//登录权限控制，cookie检查
app.use(async (ctx, next) => {
    const url = ['/login', '/logout'];

    if (!ctx.session.userId && !url.includes(ctx.url)) {
        ctx.body = {
            code: 401,
            message: "登录已过期，请重新登录"
        };
        return;
    } else {
        await next();
    }
});

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

//上传文件处理中间件
app.use( async ( ctx, next ) => {
    await upload(ctx, next); 
});

//加载路由
app.use(routes());

//异常处理（写入错误日志）
app.on('error', (err, ctx) => {
    logger.errLogger(ctx, err);
    console.error('server error', err, ctx);
});

app.listen(PORT);
console.log(`The server is listening on the port ${PORT}`);