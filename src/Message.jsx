import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <main className='messages'>
        <div className='message'>
          <span className='message-username'><strong>Anonymous</strong></span>
          <span className='message-content'>I won't be impressed with technology until I can download food.</span>
        </div>
        <div className='message system'>
        </div>
      </main>
    );
  }
}

export default Message;