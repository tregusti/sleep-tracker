var serve = require('koa-static');
var koa = require('koa');
var app = koa();

const PORT = 8086;

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(serve('client'));

app.listen(PORT);

console.log(`Sleep Tracker server listening on port ${PORT}`);

