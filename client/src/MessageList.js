import React from 'react';
import moment from 'moment';
import { List, ListItem, ListItemText, ListSubheader } from 'material-ui';

const MessageList = ({ messages }) => (
  <List className="chat-message-list">
    {messages.map(message => (
      <React.Fragment>
        <ListItem key={message.lastEventId} className="chat-message">
          <ListItemText primary={message.body} />
        </ListItem>
        <ListSubheader disableSticky className="chat-message-header">
          <strong>{moment(message.timestamp).format('H:mm:ss')}  </strong>
          {message.userId}
        </ListSubheader>
      </React.Fragment>
    ))}
  </List>
);

export default MessageList;
