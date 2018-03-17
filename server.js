const restify = require('restify');
const server = restify.createServer();
const events = require('events');
const emitter = new events.EventEmitter();
const EventType = { MessageReceived: 'MessageReceived' };

emitter.on(EventType.MessageReceived, (data) => {
  console.log(`[${EventType.MessageReceived}]=>`, data);
});

server.use(restify.plugins.bodyParser({ mapParams: false }));
server.get('/health', (req, res, next) => {
  res.send({ status: 'UP' });
  next();
});

server.post('/v1/events', (req, res, next) => {
  emitter.emit(EventType.MessageReceived, req.body);
  res.setHeader('connection', 'close');
  res.send({ id: req.body.id });
  next();
});

server.get('/v1/events:subscribe', (req, res, next) => {
  res.setHeader('content-type', 'text/event-stream');
  res.setHeader('cache-control', 'no-cache');

  emitter.on(EventType.MessageReceived, (data) => {
    res.write(`${JSON.stringify(data)}\n\n`)
  })
});

//TODO: Implement ping mechanism

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
