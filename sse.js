const events = require('events');
const emitter = new events.EventEmitter();

const EventType = {
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  PING: 'PING',
};

setInterval(() => {
  emitter.emit(EventType.PING, ':PING\n\n');
}, 3000);

const serialize = (evt) => {
  let message = [];
  if (evt.id) message.push(`id: ${evt.id}`);
  if (evt.type) message.push(`event: ${evt.type}`);
  if (evt.data) message.push(`data: ${JSON.stringify(evt.data)}`);
  return `${message.join('\n')}\n\n`;
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
  serialize,
};

