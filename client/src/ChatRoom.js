import React, { Component } from 'react';
import { Button, Input, Typography } from 'material-ui';
import { Send as SendIcon } from 'material-ui-icons';
import * as uuid from 'uuid';
import Events from './Events';
import MessageList from './MessageList';


class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      userId: uuid.v4(),
      body: '',
      messages: [],
    };
  }

  componentDidMount() {
    this.events = Events.subscribe({ onMessageReceived: this.onMessageReceived });
  }

  onMessageReceived(message) {
    this.setState({ messages: [message, ...this.state.messages]})
  }

  onMessageSubmit() {
    Events.publish({
      id: uuid.v4(),
      type: 'MESSAGE_RECEIVED',
      data: {
        userId: this.state.userId,
        body: this.state.body,
        timestamp: new Date().getTime(),
      }
    })

    this.setState({ body: '' });
  }

  handleKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.handleInputChange(evt);
      this.onMessageSubmit();
      evt.preventDefault();
    }
  }

  handleInputChange(evt) {
    this.setState({ body: evt.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="title">#creeps-anonymous</Typography>
        <MessageList messages={this.state.messages} />
        <div style={{ display: 'flex' }}>
          <Input
            style={{ flex: '2 0 0' }}
            value={this.state.body}
            placeholder="Creep into this input field"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange} />

          <Button
            style={{ flex: '0.1 0 0', marginLeft: '0.5rem' }}
            size="small"
            color="primary"
            variant="raised"
            onClick={this.onMessageSubmit}><SendIcon />Send</Button>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatRoom;