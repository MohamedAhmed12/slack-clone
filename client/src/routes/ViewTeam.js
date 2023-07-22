import { React } from "react";
import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/teams/MessageInput";
import MainLayout from "../layouts/main";

const ViewTeam = () => (
    <MainLayout
        teamName={"team name"}
        username={"Mo"}
        channelNames={["1st channel", "2nd channel"]}
        dms={["random", "general"]}
        ChildComponent={
            <div>
                <MainHeader />
                <MessageInput />
            </div>
        }
    />
);

export default ViewTeam;
