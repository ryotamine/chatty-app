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
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
    this.handleIncomingNotification = this.handleIncomingNotification.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      console.log('Connected to server.');
    };

    // this.socket.onmessage = this.handleIncomingMessage;
    this.socket.onmessage = (event) => {
      console.log('Message', event.data);
      // the socket event data is encoded as a JSON string
      // the line turns it into an object
      const data = JSON.parse(event.data);
      console.log('Data', data);

      switch(data.type) {
        case 'incomingMessage':
          // Handle incoming message
          console.log('Incoming Message');
          handleIncomingMessage(data);
          break;
        case 'incomingNotification':
          // Handle incoming notification
          console.log('Incoming Notification');
          handleIncomingNotification(data);
          break;
        default:
          // show an error in the console if the message is unknown
          // throw new Error('Unknown event type ' + data.type);
      }
    };
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

  handleIncomingMessage = (event) => {
    console.log('Incoming Message', event);
    const message = JSON.parse(event.data);
    const newMessageList = this.state.messages;
    newMessageList.push({content: message.content, name: message.username});
    this.setState({
      currentUser: {name: message.username},
      messages: newMessageList
    });
  };

  handleIncomingNotification = (event) => {
    console.log('Incoming Notification', event);
    const notification = JSON.parse(event.data);

  }

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