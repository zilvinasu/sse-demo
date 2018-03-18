import React from 'react';
import { List, ListItem, ListItemText } from 'material-ui';

const styles = {
  list: {
    height: '400px',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  item: {
    flexShrink: 0,
    padding: '0.3rem',
    marginBottom: '0.1rem',
    border: '1px solid lightgray',
    borderRadius: '5px',
    overflowWrap: 'break-word',
  },
}

const MessageList = ({ messages }) => (
  <List style={styles.list}>
    {messages.map(message => (
      <ListItem key={message.lastEventId} style={styles.item}>
        <ListItemText
          primary={message.body}
          secondary={`creep[${message.userId}] @ ${new Date(message.timestamp).toLocaleString()}`} />
      </ListItem>
    ))}
  </List>
);

export default MessageList;
