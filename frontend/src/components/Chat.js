import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Messages from './Messages.js';
import Textfield from './Textfield.js';

import { Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../styles/index.css';

const { Text } = Typography;
const { Search } = Input;


export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chat: props.chat,
      username: '',
      websocketClient: null
    };
  }

  componentDidMount() {
    this.state.websocketClient = new W3CWebSocket('ws://' + window.location.host + '/ws/chat/' + this.state.chat + '/');

    this.state.websocketClient.onopen = () => {
      console.log('WebSocket Client connected');
    };
    this.state.websocketClient.onclose = () => {
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
                <Messages websocketClient={this.state.websocketClient} owner={this.state.username} chat={this.state.chat}/>
              </div>
              <div className="textfield">
                <Textfield websocketClient={this.state.websocketClient} username={this.state.username}/>
              </div>
            </div>
        }
      </div>
    );
  }
}
