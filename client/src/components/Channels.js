/* eslint-disable */
import React from "react";
import { Grid, Icon, Menu } from "semantic-ui-react";

import "../assets/components/channels.scss";
import { Button } from "semantic-ui-react";

const Channels = ({ teamName, username, channels, users, handleOpenAddChannelModal }) => {
    const Bubble = ({ on = true }) => (on ? <span className="green">●</span> : "○");

    return (
        <Grid.Column className="channels" width={11}>
            <Menu.Item className="header">
                {teamName}
                {username}
            </Menu.Item>
            <Menu.Item>
                <h3>
                    Channels
                    <Button onClick={handleOpenAddChannelModal} icon="add circle" className="transparent-button" />
                </h3>
                {channels.map(({ id, name }) => (
                    <li key={`channel-${id}`}># {name}</li>
                ))}
            </Menu.Item>
            <Menu.Item>
                <h3>Direct Messages</h3>
                {users.map(({ id, name }) => (
                    <li key={`user-${id}`}>
                        <Bubble /> {name}
                    </li>
                ))}
            </Menu.Item>
        </Grid.Column>
    );
};

export default Channels;
