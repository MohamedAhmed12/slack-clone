import { React, useContext, useEffect } from "react";

import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/MessageInput";
import MainLayout from "../layouts/main";
import MessagesContainer from "../containers/MessagesContainer";
import { CustomContext } from "../context";
import { useQuery } from "@apollo/client";
import LIST_MESSAGES from "../graphql/messages/queries/LIST_MESSAGES";
import NEW_MESSAGE from "../graphql/messages/subscriptions/NEW_MESSAGE";

const ViewTeam = () => {
    const { currentChannel } = useContext(CustomContext);
    const channelId = currentChannel.id || 0;
    const { subscribeToMore, loading, data } = useQuery(LIST_MESSAGES, {
        variables: { channelId },
    });

    const subscribeToNewMsg = () => {
        subscribeToMore({
            document: NEW_MESSAGE,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { newMessage } = subscriptionData.data;

                return {
                    ...prev,
                    listMessages: [...prev.listMessages, newMessage],
                };
            },
        });
    };

    useEffect(() => subscribeToNewMsg(), []);

    return (
        <MainLayout
            ChildComponent={
                currentChannel && (
                    <span>
                        <MainHeader channelName={"general"} />
                        {loading || !data ? null : (
                            <MessagesContainer messages={data.listMessages} />
                        )}
                        <MessageInput channel={currentChannel} />
                    </span>
                )
            }
        />
    );
};

export default ViewTeam;
