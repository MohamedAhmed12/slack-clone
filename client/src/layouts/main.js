/* eslint-disable */
import React from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

import "../assets/layouts/main.scss";

const MainLayout = ({ teamName, username, channelNames, dms, ChildComponent }) => {
    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            <Sidebar
                as={Menu}
                animation="scaledown"
                icon="labeled"
                inverted
                vertical
                visible
                width="wide"
            >
                <Menu.Item>{teamName}</Menu.Item>
                <Menu.Item>{username}</Menu.Item>
                <Menu.Item>
                    <h3>Channels</h3>
                    {channelNames.map((channel, i) => (
                        <p key={i}>{channel}</p>
                    ))}
                </Menu.Item>
                <Menu.Item>
                    <h3>Direct Messages</h3>
                    {dms.map((dm, i) => (
                        <p key={i}>{dm}</p>
                    ))}
                </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
                <Segment basic>{ChildComponent} </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
