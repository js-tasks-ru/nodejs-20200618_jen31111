/* eslint-disable guard-for-in */
const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let subscribers = [];

router.get('/subscribe', async (ctx, next) => {
  const promise = new Promise((resolve, reject) => {
    subscribers.push(resolve);

    ctx.res.on('close', () => {
      subscribers.splice(subscribers.indexOf(resolve), 1);
    });
  });


  message = await promise;
  ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;

  if (message) {
    subscribers.forEach((resolve) => {
      resolve(message);
    });
    subscribers = [];
  }
  
  ctx.response.status = 200;
});

app.use(router.routes());

module.exports = app;
