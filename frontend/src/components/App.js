import React, { Component } from "react";
import { render } from "react-dom";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("chats/messages")
      .then(response => {
        if (response.status >= 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.data.map(message => {
          return (
            <div key={message.id}>
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
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'maciek',
        timestamp: Date.now(),
        text: this.state.new_message
      })
    }
    fetch('chats/messages/', request);
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
  render() {
    return (
      <div className="chatapp">
        <div className="messages">
          <Messages />
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