import { React, useContext } from "react";

import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/MessageInput";
import MainLayout from "../layouts/main";
import MessagesContainer from "../containers/MessagesContainer";
import { CustomContext } from "../context";
import { useQuery } from "@apollo/client";
import LIST_MESSAGES from "../graphql/messages/queries/LIST_MESSAGES";

const ViewTeam = () => {
    const { currentChannel } = useContext(CustomContext);
    const { loading, data } = useQuery(LIST_MESSAGES, {
        variables: { channelId: currentChannel.id },
    });

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
