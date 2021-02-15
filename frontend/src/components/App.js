import React, { Component } from "react";
import { render } from "react-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/'
    + 'mimi'
    + '/'
);

class Messages extends Component {
  render() {
    console.log(this.props.messages);
    return (
      <div>
        {this.props.messages.map(message => {
          return (
            <div key={message.timestamp}>
              {message.username}({message.timestamp}): {message.text}
            </div>
          );
        })}
      </div>
    );
  }
}

class Textfield extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: 'Type a message'
    };
  }

  resetNewMessage() {
    this.setState({new_message: 'Type a message'});
  }

  updateNewMessage(message) {
    this.setState({new_message: message});
  }

  sendMessage() {
    client.send(JSON.stringify({
        'username': 'maciek',
        'text': this.state.new_message
        // type: "userevent"
      }));
    this.resetNewMessage();
  }

  render() {

    return (
        <div>
          <input
              className="newMessageText"
              value={this.state.new_message}
              onChange={e => this.updateNewMessage(e.target.value)}/>
          <button
              className="sendMessageButton"
              onClick={() => this.sendMessage()}
          >
            Send
          </button>
        </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      placeholder: 'Loading'
    };
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client connected');
    };
    client.onclose = () => {
      console.error('WebSocket Client closed unexpectedly');
    };
    client.onmessage = (e) => {
      const message = JSON.parse(e.data);
      this.setState({
        messages: [...this.state.messages, message]
      });
      console.log(this.state.messages);
    };

    fetch('chats/messages')
      .then(response => {
        if (response.status >= 400) {
          return this.setState(() => {
            return { placeholder: 'Something went wrong!' };
          });
        }
        return response.json();
      })
      .then(messages => {
        this.setState(() => {
          return {
            messages
          };
        });
      });
  }

  render() {
    return (
      <div className="chatapp">
        <div className="messages">
          <Messages messages={this.state.messages}/>
        </div>
        <div className="textfield">
          <Textfield />
        </div>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);