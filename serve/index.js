const Koa = require('koa');
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchema } = require('./db/index.js')


const app = new Koa();
;(async () => {
  await connect()
  initSchema()
  app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
  }));

  app.use(async (ctx, next) => {
    await ctx.render('index', {
      name: 'bluescurry'
    });
  })

  app.listen(3000);
  })()