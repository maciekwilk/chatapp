import React, { Component } from "react";
import { render } from "react-dom";

import Chat from './Chat.js';

import { Button, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../styles/index.css';

const { Text } = Typography;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chat: props.chat
    };
  }

  createNewChat() {
    console.log('create the chat room');
  }

  render() {
    return (
      <div className="app">
        {this.state.chat === '' ?
            <div style={{ padding: '200px 40px' }}>
              <div className="title">
                <Text type="secondary" style={{ fontSize: '36px' }}>ChatUp!</Text>
              </div>
              <Button onClick={this.createNewChat()}>Create new chat room</Button>
            </div>
        :
            <div>
              <div className="chat">
                <Chat chat={this.state.chat}/>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App {...(container.dataset)}/>, container);