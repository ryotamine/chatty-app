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
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => console.log('Connected to server.');
    this.socket.onmessage = this.handleServerMessage;
  }

  addUser = (newUser) => {
    if (this.state && this.state.currentUser.name) {
      const info1 = JSON.stringify({
        id: uuid(),
        username: this.state.currentUser.name,
        content: newChat
      });
      this.socket.send(info1);
    }
  };

  addMessage = (newChat) => {
    if (this.state && this.state.messages) {
      const info2 = JSON.stringify({
        id: uuid(),
        username: this.state.currentUser.name,
        content: newChat
      });
      this.socket.send(info2);
    }
  };

  handleServerMessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);
    this.setState({
      currentUser: this.state.currentUser.name,
      messages: [...this.state.messages, message] });
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Message />
        <ChatBar addUser={this.addUser.bind(this)} addMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;