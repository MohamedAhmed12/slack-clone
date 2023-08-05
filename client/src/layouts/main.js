import React from "react";
import { Segment, Sidebar } from "semantic-ui-react";

import "../assets/layouts/main.scss";
import SidebarContainer from "../containers/Sidebar";

const MainLayout = ({ teams, team, ChildComponent }) => {
    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            <SidebarContainer teams={teams} team={team} />
            <Sidebar.Pusher>
                <Segment basic>{ChildComponent}</Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
