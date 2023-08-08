import React from "react";
import { useQuery } from "@apollo/client";
import { Comment } from "semantic-ui-react";

import "../assets/containers/messages-container.scss";
import LIST_MESSAGES from "../graphql/messages/queries/LIST_MESSAGES";

const MessagesContainer = ({ channelId }) => {
    // eslint-disable-next-line
    const { loading, error, data } = useQuery(LIST_MESSAGES, {
        variables: { channelId },
    });

    if (loading) return null;

    return (
        <Comment.Group className="message-container">
            {data.listMessages.map((message) => (
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
