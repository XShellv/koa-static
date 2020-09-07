const Koa = require("koa");
const Router = require("koa-router");

const koaStatic = require("koa-static");
const koaStaticRouter = require('koa-static-router');

const app = new Koa()
const path = require("path");
const router = new Router();
const fs = require("fs");
app.use(koaStatic(path.resolve(__dirname, 'public/build')))

app.use(async (ctx, next) => {
    const reg = /^(\/manage)/
    if (reg.test(ctx.path)) {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'public/build/manage.html'));
    }
    await next()
})

router.get("/", async (ctx) => {
    ctx.body = {
        success: true
    }
});


app.use(router.routes())

app.listen(4000, () => {
    console.log(`> Ready on http://localhost:4000`);
});