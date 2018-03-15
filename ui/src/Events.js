const Events = {
  subscribe: () => {
    const eventSource = new EventSource('/v1/events:subscribe');

    eventSource.addEventListener('open', () => {
      console.log('Connection => open');
    });

    eventSource.addEventListener('error', () => {
      console.log('Connection => error');
    });

    eventSource.addEventListener('message', (data) => {
      /*Standard type, when no event type specified*/
      console.log('Message => ', data);
    });

    eventSource.addEventListener('MessageReceived', (data) => {
      console.log('MessageReceived => ', data);
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