/* eslint-disable */
import React from "react";
import { Segment, Sidebar } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import "../assets/layouts/main.scss";
import SidebarContainer from "../containers/Sidebar";

const MainLayout = ({ ChildComponent }) => {
    const {channelId, teamId} = useParams();

    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            <SidebarContainer currentTeamId={teamId} />
            <Sidebar.Pusher>
                <Segment basic>{ChildComponent} </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
