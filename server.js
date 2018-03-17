const restify = require('restify');
const server = restify.createServer();
const events = require('events');
const emitter = new events.EventEmitter();
const EventType = { MESSAGE_RECEIVED: 'MESSAGE_RECEIVED', PING: 'PING' };

setInterval(() => {
  emitter.emit(EventType.PING)
}, 3000);

server.use(restify.plugins.bodyParser({ mapParams: false }));
server.get('/health', (req, res, next) => {
  res.send({ status: 'UP' });
  next();
});

server.post('/v1/events', (req, res, next) => {
  emitter.emit(EventType.MESSAGE_RECEIVED, req.body);
  res.send({ id: req.body.id });
  return next();
});

server.get('/v1/events:subscribe', (req, res, next) => {
  res.setHeader('content-type', 'text/event-stream');
  res.setHeader('cache-control', 'no-cache');

  emitter.on(EventType.MESSAGE_RECEIVED, (data) => {
    res.write(`${JSON.stringify(data)}\n\n`)
  });

  emitter.on(EventType.PING, () => res.write(`:PING\n\n`))
});


server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
