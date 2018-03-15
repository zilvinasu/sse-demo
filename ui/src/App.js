import React, { Component } from 'react';
import Subscribe from './Subscribe';

class App extends Component {
  constructor(props) {
    super(props);

    this.subscriber = new Subscribe('/v1/events:subscribe');
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
