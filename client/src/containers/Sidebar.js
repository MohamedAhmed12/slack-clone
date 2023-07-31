import { React, useState } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../assets/containers/sidebar.scss";
import { getCurrentUser } from "../helper/auth";
import LIST_TEAMS from "../graphql/teams/queries/LIST_TEAMS";
import AddChannelModal from "../components/AddChannelModal";
import Channels from "../components/Channels";

const SidebarContainer = ({ currentTeamId }) => {
    const [openAddChannelModal, setOpenAddChannelModal] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(LIST_TEAMS, { fetchPolicy: "network-only" });

    if (loading) return null;

    const teams = data.listTeams;
    const team = teams.find((team) => team.id == currentTeamId) || teams[0];
    let username = getCurrentUser().username;

    return (
        <Sidebar as={Menu} width="wide" visible vertical className="sidebar-container">
            <Grid divided="vertically">
                <Grid.Row columns={2}>
                    <Grid.Column width={5} className="team-list" textAlign="center">
                        {teams.map((team) => (
                            <Link
                                key={`team-${team.id}`}
                                to={`/view-team/${team.id}`}
                                className="item"
                            >
                                {team.name.charAt(0).toUpperCase()}
                            </Link>
                        ))}
                    </Grid.Column>
                    <Channels
                        teamName={team.name}
                        username={username}
                        channels={team.channels}
                        users={[
                            { id: 1, name: "slackbot" },
                            { id: 2, name: "user1" },
                        ]}
                        handleOpenAddChannelModal={() => setOpenAddChannelModal(true)}
                    />
                    <AddChannelModal
                        open={openAddChannelModal}
                        onClose={() => setOpenAddChannelModal(false)}
                    />
                </Grid.Row>
            </Grid>
        </Sidebar>
    );
};

export default SidebarContainer;
