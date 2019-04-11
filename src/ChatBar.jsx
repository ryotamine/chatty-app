import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: '',
      newChat: ''
    };
  }

  handleUser = (eventUser) => {
    eventUser.preventDefault();
    let newUser = eventUser.target.value;
    this.setState({newUser});
  }

  handleChat = (eventChat) => {
    eventChat.preventDefault();
    let newChat = eventChat.target.value;
    this.setState({newChat});
  }

  nameChange = (eventName) => {
    this.props.changeName(eventName.target.value);
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username'
               placeholder='Your Name (Optional)'
               type='text'
               value={this.state.newUser}
               onChange={this.handleUser}
               onBlur={this.nameChange}
        />
        <input className='chatbar-message'
               placeholder='Type a message and hit ENTER'
               type='text'
               value={this.state.newChat}
               onChange={this.handleChat}
               onKeyPress={event => {
                 if (event.key === 'Enter') {
                   this.props.sendMessage(this.state.newChat);
                   this.setState({newChat: ''});
                 }
               }}
        />
      </footer>
    );
  }
}

export default ChatBar;