import React, { Component } from "react";
import { render } from "react-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { Card, Avatar, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

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
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }}>
        {this.props.messages.map(message =>
          <Card key={message.timestamp} style={{ width:300, margin: '16px 4px 0 4px', alignSelf: this.props.owner === message.username ? 'flex-end' : 'flex-start' }}>
            <Meta
                avatar={
                  <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.username[0].toUpperCase()}</Avatar>
                }
                title={message.username}
                description={message.text}
            />
          </Card>
        )}
      </div>
    );
  }
}

class Textfield extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: ''
    };
  }

  resetNewMessage() {
    this.setState({new_message: ''});
  }

  updateNewMessage(message) {
    this.setState({new_message: message});
  }

  sendMessage() {
    client.send(JSON.stringify({
        'username': this.props.username,
        'text': this.state.new_message
      }));
    this.resetNewMessage();
  }

  render() {

    return (
        <div className="textfield">
          <Search
            placeholder="Type a message"
            enterButton="Send"
            value={this.state.new_message}
            size="large"
            onChange={e => this.updateNewMessage(e.target.value)}
            onSearch={() => this.sendMessage()}
          />
        </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
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
      <div className="chat">
        {this.state.username === '' ?
            <div style={{ padding: '200px 40px' }}>
              <div className="title">
                <Text type="secondary" style={{ fontSize: '36px' }}>ChatUp!</Text>
              </div>
              <Search
                placeholder="Enter username"
                enterButton="Login"
                size="large"
                onSearch={value => this.setState({username: value})}
              />
            </div>
        :
            <div>
              <div className="messages">
                <Messages messages={this.state.messages} owner={this.state.username}/>
              </div>
              <div className="textfield">
                <Textfield username={this.state.username}/>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);