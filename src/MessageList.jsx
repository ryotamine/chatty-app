import React, {Component} from 'react';
import Message from './Message.jsx';

// Message list class
class MessageList extends Component {
  // Message list constructor
  constructor(props) {
    super(props);
  }

  // Render message list
  render() {
    const messageList = this.props.messages.map((message) => {
      if (message.type === 'postMessage') {
        return (
          <Message key={message.id} message={message}/>
        );
      } else {
        return (
          <div className="notification" key={message.id}>
            <span className="notification-content">{message.content}</span>
          </div>
        );
      }
    });
    return (
      <div className='message-list'>
        {messageList}
      </div>
    );
  }
}

export default MessageList;