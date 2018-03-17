const events = require('events');
const emitter = new events.EventEmitter();

const EventType = {
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  PING: 'PING'
};

setInterval(() => {
  emitter.emit(EventType.PING, ':PING\n\n');
}, 3000);

const serialize = (evt) => {
  const message = [
    `id: ${evt.id}`,
    `event: ${evt.type}`,
    `data: ${JSON.stringify(evt.data)}`
  ].join('\n');

  return `${message}\n\n`
};

const SseEmitter = {
  subscribeAll: (handler) => {
    Object.keys(EventType).map(type => emitter.on(type, (evt) => {
      const message = type === EventType.PING ? evt : serialize(evt);
      handler(message);
    }));
  },
  publish: ({ type, event }) => emitter.emit(type, event),
};

module.exports = {
  EventType,
  SseEmitter,
  serialize
};

