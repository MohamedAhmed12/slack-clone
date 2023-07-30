/* eslint-disable */
import { React } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Menu, Sidebar } from "semantic-ui-react";

import "../assets/containers/sidebar.scss";
import { getCurrentUser } from "../helper/auth";
import LIST_TEAMS from "../graphql/teams/queries/LIST_TEAMS";
import Channels from "../components/Channels";

const SidebarContainer = ({ currentTeamId }) => {
    const { loading, error, data } = useQuery(LIST_TEAMS);

    if (loading) return null;

    const teams = data.listTeams;
    const team = teams.find((team) => team.id === currentTeamId);
    let username = getCurrentUser().username;

    return (
        <Sidebar as={Menu} width="wide" visible vertical className="sidebar-container">
        <Grid divided="vertically">
            <Grid.Row columns={2}>
                <Grid.Column width={5} className="team-list" textAlign="center">
                    {teams.map((team) => (
                        <div key={`team-${team.id}`} className="item">
                            {team.name.charAt(0).toUpperCase()}
                        </div>
                    ))}
                </Grid.Column>
                <Channels
                    width={11}
                    teamName={team.name}
                    username={username}
                    channels={team.channels}
                    users={[
                        { id: 1, name: "slackbot" },
                        { id: 2, name: "user1" },
                    ]}
                />
            </Grid.Row>
        </Grid>

        {/* <div className="sidebar-container">
               
            </Grid>
        </div> */}
    </Sidebar>
    );
};

export default SidebarContainer;