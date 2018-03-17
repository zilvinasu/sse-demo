const Events = {
  subscribe: (handlers = {}) => {
    const eventSource = new EventSource('/v1/events:subscribe');

    eventSource.addEventListener('open', (evt) => {
      console.log('SSE[open]=> ', evt);
    });

    eventSource.addEventListener('error', (evt) => {
      console.log('SSE[error] => ', evt);
    });

    eventSource.addEventListener('message', (evt) => {
      /*Standard type, when no event type specified*/
      console.log('SSE[message] => ', evt);
    });

    eventSource.addEventListener('MESSAGE_RECEIVED', (evt) => {
      console.log('SSE[MESSAGE_RECEIVED] => ', evt);
      if (handlers.onMessageReceived) {
        handlers.onMessageReceived({
          lastEventId: evt.lastEventId,
          ...JSON.parse(evt.data)
        });
      }
    })

    return eventSource;
  },
  publish: (payload) => {
    return fetch('/v1/events', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json',
      }
    });
  }
};


export default Events;