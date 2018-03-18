import React from 'react';
import moment from 'moment';
import { List, ListItem, ListItemText, ListSubheader } from 'material-ui';

const styles = {
  list: {
    height: '400px',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  item: {
    flexShrink: 0,
    backgroundColor: '#F1F0F0',
    color: '#070707',
    padding: '0.4rem 0.8rem',
    marginBottom: '0.1rem',
    border: '1px solid lightgray',
    borderRadius: '0.9rem',
    overflowWrap: 'break-word',
  },
  header: {
    padding: '1rem 0 0.1rem 0.5rem',
    lineHeight: 'initial',
  },
}

const MessageList = ({ messages }) => (
  <List style={styles.list}>
    {messages.map(message => (
      <React.Fragment>
        <ListItem key={message.lastEventId} style={styles.item}>
          <ListItemText primary={message.body} />
        </ListItem>
        <ListSubheader disableSticky style={styles.header}>
          <strong>{moment(message.timestamp).format('H:mm:ss')}  </strong>
          {message.userId}
        </ListSubheader>
      </React.Fragment>
    ))}
  </List>
);

export default MessageList;
