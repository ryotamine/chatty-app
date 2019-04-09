import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages});
    }, 3000);
  }

  addMessage(content) {
    this.setState(state => {
      state.messages = [...state.messages, { id: Math.random(), username: state.currentUser.name, content }];
      return state;
    });
  }

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
}

export default App;