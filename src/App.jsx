import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

//const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Bob'},
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages});
    }, 3000);

    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => console.log('Connected to server.');
    this.socket.onmessage = this.handleServerMessage;
  }


  addMessage = (newChat) => {
    if (this.state && this.state.messages) {
      const info = JSON.stringify({
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