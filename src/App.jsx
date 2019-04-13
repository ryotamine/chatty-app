import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

// App class
class App extends Component {
  // App constructor
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      activeUser: 1
    };
  }

  // Connect WebSocket
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => console.log('Connected to server.');
    this.socket.onmessage = this._handleServerMessage;
  }

  // Render app
  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <a className='users-online'>{this.state.activeUser} users online</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar sendMessage={this._sendMessage} changeName={this._changeName}/>
      </div>
    );
  }

  // Username change function
  _changeName = (name) => {
    if (name === '') {
      const defaultName = 'Anonymous';
      const notify = {
        type: 'postNotification',
        content: `${defaultName} has changed their name to ${name}.`
      };
      this.socket.send(JSON.stringify(notify));
      this.setState({ currentUser: {name} });
    } else if (name === this.state.currentUser.name) {

    } else if (name !== this.state.currentUser.name) {
      const notify = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${name}.`
      };
      this.socket.send(JSON.stringify(notify));
      this.setState({ currentUser: {name} });
    }
  };

  // Send message function
  _sendMessage = (content) => {
    this.socket.send(JSON.stringify({
      type: 'postMessage',
      content,
      name: this.state.currentUser.name
    }));
  };

  // Server message helper function
  _handleServerMessage = (event) => {
    const message = JSON.parse(event.data);
    let newMessageList;
    switch(message.type) {
      case 'postNotification':
        newMessageList = this.state.messages;
        newMessageList.push(message);
        this.setState({ messages: newMessageList });
        break;
      case 'postMessage':
        newMessageList = this.state.messages;
        newMessageList.push(message);
        this.setState({ messages: newMessageList });
        break;
      case 'user':
        this.setState({ activeUser: message.clients });
        break;
      default:
        throw new Error(`Unknown event type ${data.type}`);
    }
  };
}

export default App;