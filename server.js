const restify = require('restify');
const { SseEmitter, EventType } = require('./sse');
const server = restify.createServer();

server.use(restify.plugins.bodyParser({ mapParams: false }));

server.get('/health', (req, res, next) => {
  res.send({ status: 'UP' });
  next();
});

server.post('/v1/events', (req, res, next) => {
  SseEmitter.publish({
    type: EventType.MESSAGE_RECEIVED,
    event: req.body
  });
  res.send({ id: req.body.id });
  next();
});

server.get('/v1/events:subscribe', (req, res, next) => {
  res.setHeader('content-type', 'text/event-stream');
  res.setHeader('cache-control', 'no-transform');
  SseEmitter.subscribeAll((message) => res.write(message));
});

server.get(
  /\/(.*)?.*/,
  restify.plugins.serveStatic({
    directory: './client/build',
    default: 'index.html',
  }),
);

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
