import React, {Component} from 'react';

class Message extends Component {
  render() {
    let message = this.props.message;
    return (
      <div className='message'>
          <span className='username'><strong>{message.name}</strong></span>
          <span className='content'>{message.content}</span>
        </div>
    );
  }
}

export default Message;