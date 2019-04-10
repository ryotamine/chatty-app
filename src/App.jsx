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


  addMessage = (newChat) => {
    if (this.state && this.state.messages) {
      const info = JSON.stringify({
        id: uuid(),
        username: this.state.currentUser.name,
        content: newChat
      });
      this.socket.send(info);
    }
  };

  handleServerMessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);
    this.setState({ messages: [...this.state.messages, message] });
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Message />
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }

  // addMessage(content) {
  //   this.setState(state => {
  //     state.messages = [...state.messages, { id: uuid(), username: state.currentUser.name, content }];
  //     return state;
  //   });
  // };
}

export default App;