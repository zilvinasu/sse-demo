import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.eventSource = new EventSource('/v1/events:subscribe');

    this.eventSource.addEventListener('open', () => {
      console.log('Connection is open');
    });

    this.eventSource.addEventListener('error', () => {
      console.log('error received');
    });

    this.eventSource.addEventListener('message', (data) => {
      console.log('Receiving data => ', data);
    });

    this.eventSource.onmessage = () => {
      console.log('receiving message => ', console.log('ddd'));
    };
  }

  render() {
    return (
      <div className="App">
      This is my app
      </div>
    );
  }
}

export default App;
