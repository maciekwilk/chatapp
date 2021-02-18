import React, { Component } from "react";
import { render } from "react-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Messages from './Messages.js';
import Textfield from './Textfield.js';

import { Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../styles/index.css';

const { Search } = Input;
const { Text } = Typography;

const client = new W3CWebSocket('ws://' + window.location.host + '/ws/chat/' + 'mimi' + '/');

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client connected');
    };
    client.onclose = () => {
      console.error('WebSocket Client closed unexpectedly');
    };
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
                <Textfield username={this.state.username} websocket_client={client}/>
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