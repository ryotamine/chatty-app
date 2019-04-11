import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: '',
      newChat: ''
    };
    this.handleUser = this.handleUser.bind(this);
    this.handleChat = this.handleChat.bind(this);
  }

  handleUser(eventUser) {
    eventUser.preventDefault();
    let newUser = eventUser.target.value;
    this.setState({newUser});
  }

  handleChat(eventChat) {
    eventChat.preventDefault();
    let newChat = eventChat.target.value;
    this.setState({newChat});
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username'
               placeholder='Your Name (Optional)'
               type='text'
               value={this.state.newUser}
               onChange={this.handleUser}
               onKeyPress={event1 => {
                 if (event1.key === 'Enter') {
                   this.props.addUser(this.state.newUser, this.state.newChat)
                 }
               }}

        />
        <input className='chatbar-message'
               placeholder='Type a message and hit ENTER'
               type='text'
               value={this.state.newChat}
               onChange={this.handleChat}
               onKeyPress={event2 => {
                 if (event2.key === 'Enter') {
                   this.props.addUser(this.state.newUser, this.state.newChat)
                 }
               }}
        />
      </footer>
    );
  }
}

export default ChatBar;