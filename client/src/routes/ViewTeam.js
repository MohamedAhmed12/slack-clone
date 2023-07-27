import { React } from "react";
import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/teams/MessageInput";
import MainLayout from "../layouts/main";

const ViewTeam = () => (
    <MainLayout
        teamName="Team name"
        username="Username"
        channels={[
            { id: 11, name: "general" },
            { id: 22, name: "random" },
        ]}
        users={[
            { id: 1, name: "slackbot" },
            { id: 2, name: "user1" },
        ]}
        teams={[{ id: 1, letter: 'B' }, { id: 2, letter: 'Q' }]} 
        ChildComponent={
            <div>
                <MainHeader channelName={"general"} />
                <MessageInput channelName={"general"} />
            </div>
        }
    />
);

export default ViewTeam;
