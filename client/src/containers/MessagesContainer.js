import React from "react";
import { Comment } from "semantic-ui-react";

import "../assets/containers/messages-container.scss";

const MessagesContainer = ({ messages }) => {
    return (
        <Comment.Group className="message-container">
            {messages.map((message) => (
                <Comment key={`${message.id}-message`}>
                    <Comment.Content>
                        <Comment.Author as="a">{message.user.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{message.created_at}</div>
                        </Comment.Metadata>
                        <Comment.Text>{message.text}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            ))}
        </Comment.Group>
    );
};
export default MessagesContainer;
