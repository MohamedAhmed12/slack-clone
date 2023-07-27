/* eslint-disable */
import React from "react";
import { Grid, Menu, Segment, Sidebar } from "semantic-ui-react";

import "../assets/layouts/main.scss";
import Channels from "../components/Channels";

const MainLayout = ({ teams, teamName, username, channels, users, ChildComponent }) => {
    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            <Sidebar as={Menu} width="wide" visible vertical>
                <div className="sidebar-container">
                    <Grid>
                        <Grid.Row centered>
                            <Grid.Column
                                width={5}
                                className="team-list"
                                textAlign="center"
                                verticalAlign="center"
                            >
                                {teams.map(({ id, letter }) => (
                                    <div key={`team-${id}`} className="item">
                                        {letter}
                                    </div>
                                ))}
                            </Grid.Column>

                            <Channels width={11}  teamName={teamName} username={username} channels={channels} users={users} />
                        </Grid.Row>
                    </Grid>
                </div>
            </Sidebar>
            {/* height: '100%'; display: 'flex'; flex-direction: 'column'; */}
            <Sidebar.Pusher>
                <Segment basic>{ChildComponent} </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
