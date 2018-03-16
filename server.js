const restify = require('restify');
const server = restify.createServer();

server.get('/health', (req, res, next) => {
  res.send({ status: 'UP' });
});

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});