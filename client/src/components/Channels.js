/* eslint-disable */
import React from "react";
import { Grid, Menu } from "semantic-ui-react";

import "../assets/components/channels.scss";

const Channels = ({ teamName, username, channels, users, width }) => {
    const Bubble = ({ on = true }) => (on ? <span className="green">●</span> : '○');

    return (
        <Grid.Column className="channels" width={11}>
            <Menu.Item className="header">
                {teamName}
                {username}
            </Menu.Item>
            <Menu.Item>
                <h3>Channels</h3>
                {channels.map((id, name) => (
                    <li key={`channel-${id}`}># {name}</li>
                ))}
            </Menu.Item>
            <Menu.Item>
                <h3>Direct Messages</h3>
                {users.map(({ id, name }) => (
                    <li key={`user-${id}`}><Bubble /> {name}</li>
                ))}
            </Menu.Item>
        </Grid.Column>
    );
};

export default Channels;
