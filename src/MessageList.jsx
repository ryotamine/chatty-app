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
      return (
        <Message key={message.id} message={message}/>
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