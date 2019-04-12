import React, {Component} from 'react';

// Acquire UUID
const uuid = require('uuid/v4');

// Message class
class Message extends Component {
  render() {
    let message = this.props.message;
    return (
      <div className='message' key={uuid()}>
        <span className='message-username'><strong>{message.name}</strong></span>
        <span className='message-content'>{message.content}</span>
      </div>
    );
  }
}

export default Message;