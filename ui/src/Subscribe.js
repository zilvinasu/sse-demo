class Subscribe {
  constructor(url) {
    this.eventSource = new EventSource(url);

    this.eventSource.addEventListener('open', () => {
      console.log('Connection => open');
    });

    this.eventSource.addEventListener('error', () => {
      console.log('Connection => error');
    });

    this.eventSource.addEventListener('message', (data) => {
      /*Standard type, when no event type specified*/
      console.log('Message => ', data);
    });

    this.eventSource.addEventListener('MessageReceived', (data) => {
      console.log('MessageReceived => ', data);
    })
  }
}

export default Subscribe;