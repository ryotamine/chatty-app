import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.messages);
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