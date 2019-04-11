import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
    this.handleServerMessage = this.handleServerMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => console.log('Connected to server.');
    this.socket.onmessage = this.handleServerMessage;
  }

  addUser = (newUser, newChat) => {
    if (newUser && newChat) {
      const info = JSON.stringify({
        id: uuid(),
        username: newUser,
        content: newChat
      });
      this.socket.send(info);
    }
  };

  handleServerMessage = (event) => {
    const message = JSON.parse(event.data);
    const newMessageList = this.state.messages;
    newMessageList.push({content: message.content, name: message.username});
    this.setState({
      currentUser: {name: message.username},
      messages: newMessageList
    });
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Message />
        <ChatBar addUser={this.addUser.bind(this)}/>
      </div>
    );
  }
}

export default App;