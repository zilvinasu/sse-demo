import React from 'react';
import { List, ListItem, ListItemText, Divider } from 'material-ui';

const styles = {
  list: {
    height: '400px',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  item: {
    flexShrink: 0,
    padding: 0,
  },
}

const MessageList = ({ messages }) => (
  <List style={styles.list}>
    {messages.map(message => (
      <ListItem key={message.lastEventId} style={styles.item}>
        <ListItemText
          primary={message.body}
          secondary={`creep[${message.userId}] @ ${new Date(message.timestamp).toLocaleString()}`} />
        <Divider />
      </ListItem>
    ))}
  </List>
);

export default MessageList;
