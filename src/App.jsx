import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      activeUser: []
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => console.log('Connected to server.');
    if (this) {

    } else {

    }
    this.socket.onmessage = this.handleServerMessage;
  }

  changeName = (e) => {
    if (e === '') {
      const defaultName = 'Anonymous';
      console.log(defaultName);
      const notify = {
        'type': 'postNotification',
        'content': `${defaultName} has changed their name to ${e}.`};
      this.socket.send(JSON.stringify(notify));
      this.setState({currentUser: {name: e }});
    } else if (e === this.state.currentUser.name) {

    } else if (e !== this.state.currentUser.name) {
      console.log('Event of name', e);
      const notify = {'type': 'postNotification',
       'content': `${this.state.currentUser.name} has changed their name to ${e}.`,
       id: uuid() };
      console.log(`${this.state.currentUser.name} has changed their name to ${e}.`);
      this.socket.send(JSON.stringify(notify));
      this.setState({currentUser: {name: e }});

      console.log(this.state.currentUser.name);
    }
  };

  sendMessage = (content) => {
    this.socket.send(JSON.stringify({
      type: 'postMessage',
      content,
      id: uuid(),
      name: this.state.currentUser.name
    }));
  };

  // trackUsers = (a) => {
  //   console.log('Users', a);
  //     this.setState({

  //     });
  //   }))
  // }

  handleServerMessage = (event) => {
    console.log(event);
    const message = JSON.parse(event.data);
    const newMessageList = this.state.messages;
    newMessageList.push(message);
    this.setState({
      messages: newMessageList
    });
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <a className='users-online'>{this.state.activeUser} users online</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar sendMessage={this.sendMessage} changeName={this.changeName}/>
      </div>
    );
  }
}

export default App;