import React, {Component} from "react";

import {Avatar, Card} from "antd";
import 'antd/dist/antd.css';
import '../styles/index.css';

const { Meta } = Card;

export default class Messages extends Component {
  render() {
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
