import React, { Component } from 'react';
import { Input, InputAdornment, IconButton, Typography } from 'material-ui';
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
    this.events = Events.subscribe({
      onMessageReceived: this.onMessageReceived,
    });
  }

  onMessageReceived(message) {
    this.setState({ messages: [message, ...this.state.messages]})
  }

  onMessageSubmit() {
    if (this.state.body !== '') {
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
        <Typography variant="title" className="chat-title">#anonymous</Typography>
        <MessageList messages={this.state.messages} />
        <Input
          fullWidth
          className="chat-input"
          value={this.state.body}
          placeholder="Type a message..."
          onKeyPress={this.handleKeyPress}
          onChange={this.handleInputChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={this.onMessageSubmit}><SendIcon /></IconButton>
            </InputAdornment>
          } />
      </React.Fragment>
    );
  }
}

export default ChatRoom;