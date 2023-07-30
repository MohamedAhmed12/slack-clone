/* eslint-disable */
import React from "react";
import { Segment, Sidebar } from "semantic-ui-react";

import "../assets/layouts/main.scss";
import SidebarContainer from "../containers/Sidebar";

const MainLayout = ({ ChildComponent }) => {
    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            <SidebarContainer currentTeamId={51} />
            <Sidebar.Pusher>
                <Segment basic>{ChildComponent} </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
