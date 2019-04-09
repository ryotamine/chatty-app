import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageList = this.props.messages.map((message) => {
      return (
        <div className='message' key={message.id.toString()}>
          <span className='username'><strong>{message.username}</strong></span>
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