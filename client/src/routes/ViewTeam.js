import { React } from "react";
import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/MessageInput";
import MainLayout from "../layouts/main";

const ViewTeam = () => (
    <MainLayout
        ChildComponent={
            <div>
                <MainHeader channelName={"general"} />
                <MessageInput channelName={"general"} />
            </div>
        }
    />
);

export default ViewTeam;
