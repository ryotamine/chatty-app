import React, {Component} from 'react';

// Chat bar class
class ChatBar extends Component {
  // Chat bar constructor
  constructor(props) {
    super(props);

    this.state = {
      newUser: '',
      newChat: ''
    };
  }

  // Render chat bar
  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username'
               placeholder='Your Name (Optional)'
               type='text'
               value={this.state.newUser}
               onChange={this._handleUser}
               onBlur={this._handleNameChange}
        />
        <input className='chatbar-message'
               placeholder='Type a message and hit ENTER'
               type='text'
               value={this.state.newChat}
               onChange={this._handleChat}
               onKeyPress={event => {
                 if (event.key === 'Enter') {
                   this.props.sendMessage(this.state.newChat);
                   this.setState({ newChat: '' });
                 }
               }}
        />
      </footer>
    );
  }

  // Username helper function
  _handleUser = (eventUser) => {
    eventUser.preventDefault();
    let newUser = eventUser.target.value;
    this.setState({ newUser });
  }

  // Chat helper function
  _handleChat = (eventChat) => {
    eventChat.preventDefault();
    let newChat = eventChat.target.value;
    this.setState({ newChat });
  }

  // Username change helper function
  _handleNameChange = (eventName) => {
    this.props.changeName(eventName.target.value);
  }
}

export default ChatBar;