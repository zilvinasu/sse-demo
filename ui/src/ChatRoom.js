import React, { Component } from 'react';
import { Button } from 'material-ui';
import Events from './Events';


class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.events = Events.subscribe();
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  componentDidMount() {

  }

  onMessageSubmit() {
    Events.publish({
      id: `${new Date().getTime()}`,
      type: 'MessageReceived',
      data: {
        userId: 'Rick',
        body: 'Morty',
      }
    })
  }

  render() {
    return (
      <Button
        color="primary"
        variant="raised"
        onClick={this.onMessageSubmit}>Send Message</Button>
    );
  }
}

export default ChatRoom;