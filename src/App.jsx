import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <MessageList />
        <Message />
        <ChatBar />
      </div>
    );
  }
}

export default App;