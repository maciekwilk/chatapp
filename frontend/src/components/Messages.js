import React, {Component} from "react";

import {Avatar, Card} from "antd";
import 'antd/dist/antd.css';
import '../styles/index.css';

const { Meta } = Card;

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.props.websocketClient.onmessage = (e) => {
      const message = JSON.parse(e.data);
      this.setState({
        messages: [...this.state.messages, message]
      });
      this.scrollToBottom();
    };

    const chat = this.props.chat;
    fetch('http://' + window.location.host + '/chatapp/chats/' + chat + '/messages')
      .then(response => {
        if (response.status >= 400) {
          console.error(response);
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

    this.scrollToBottom();
  }

  render() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }}>
          {this.state.messages.map(message =>
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
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
    );
  }
}
