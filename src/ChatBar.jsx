import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {newChat: ''};
    this.handleChat = this.handleChat.bind(this);
  }

  handleChat(event) {
    event.preventDefault();
    let newChat = event.target.value;
    this.setState({ newChat });
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' type='text' defaultValue={this.props.currentUser}/>
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' type='text' value={this.state.newChat} onChange={this.handleChat}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.props.addMessage(this.state.newChat)
            }
          }}/>
      </footer>
    );
  }
}

export default ChatBar;