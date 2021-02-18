import React, {Component} from "react";

import {Input} from "antd";
import 'antd/dist/antd.css';
import '../styles/index.css';

const { Search } = Input;

export default class Textfield extends Component {
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
        this.props.websocketClient.send(JSON.stringify({
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
