/* eslint-disable */
import React from "react";
import { Grid, Icon, Menu } from "semantic-ui-react";

import "../assets/components/channels.scss";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Channels = ({ team, username, channels, users, handleOpenAddChannelModal }) => {
    const Bubble = ({ on = true }) => (on ? <span className="green">●</span> : "○");

    return (
        <Grid.Column className="channels" width={11}>
            <Menu.Item className="header">
                {team.name}
                {username}
            </Menu.Item>
            <Menu.Item>
                <h3>
                    Channels
                    <Button
                        onClick={handleOpenAddChannelModal}
                        icon="add circle"
                        className="transparent-button"
                    />
                </h3>

                {channels.map(({ id, name }) => (
                        // <li>{name}</li>
                    <Link key={`channel-${id}`} to={`/view-team/${team.id}/${id}`} className="channel">
                        <li>{name}</li>
                    </Link>
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
