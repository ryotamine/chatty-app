import React, {Component} from 'react';

const uuid = require('uuid/v4');

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageList = this.props.messages.map((message) => {
      console.log("Is this seen?", message);
      return (
        <div className='message' key={uuid()}>
          <span className='username'><strong>{message.name}</strong></span>
          <span className='content'>{message.content}</span>
        </div>
      );
    });
    return (
      <div className='message-list'>
        {messageList}
      </div>
    );
  }
}

export default MessageList;