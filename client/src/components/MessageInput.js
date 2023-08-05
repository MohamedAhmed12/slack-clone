/* eslint-disable */
import React from "react";
import { Input } from "semantic-ui-react";

const MessageInput = ({channel}) => (
    <span>
        <div className="messages" style={{ "gridColumn": 3, "gridRow": 2 }}>
            <ul className="message-list">
                <li />
                <li />
            </ul>
        </div>
        <div
            className="send-message-wrapper"
            style={{ "gridColumn": 3, "gridRow": 3, margin: "20px" }}
        >
            <Input fluid placeholder={`Message #${channel.name}`} />
        </div>
    </span>
);

export default MessageInput;
