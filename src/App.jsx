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
    console.log("We are here");
    if (newUser && newChat) {
      const info1 = JSON.stringify({
        id: uuid(),
        username: newUser,
        content: newChat
      });
      console.log('info1', info1);
      this.socket.send(info1);
    }
  };

  handleServerMessage = (event) => {
    console.log("Here");
    const message = JSON.parse(event.data);
    console.log("Message", message);
    console.log("Name", this.state.currentUser.name);
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