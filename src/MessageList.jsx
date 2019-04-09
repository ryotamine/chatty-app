import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageList = this.props.messages.map((message) => {
      return <ul key={message.id.toString()}><strong>{message.username}</strong> {message.content}</ul>
    });
    return (
      <div>
        {messageList}
      </div>
    );
  }
}

export default MessageList;