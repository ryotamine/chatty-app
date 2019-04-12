import React, {Component} from 'react';

// Message class
class Message extends Component {
  render() {
    let message = this.props.message;
    return (
      <div className='message'>
        <span className='message-username'>{message.name}</span>
        <span className='message-content'>{message.content}</span>
      </div>
    );
  }
}

export default Message;