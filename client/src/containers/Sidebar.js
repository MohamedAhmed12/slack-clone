import { React, useState } from "react";
import { Grid, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../assets/containers/sidebar.scss";
import { getCurrentUser } from "../helper/auth";
import AddChannelModal from "../components/AddChannelModal";
import InvitePeopleModal from "../components/InvitePeopleModal";
import Channels from "../components/Channels";

const SidebarContainer = ({ teams, currentTeamId }) => {
    const [toggleAddChannelModal, setToggleAddChannelModal] = useState(false);
    const [toggleInvitePeopleModal, setToggleInvitePeopleModal] = useState(false);

    const team = teams.find((team) => team.id == currentTeamId) || teams[0];
    let username = getCurrentUser().username;

    const handleModalClose = (e, callBack) => {
        if (e) {
            e.preventDefault();
        }
        callBack;
    };

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
                        team={team}
                        username={username}
                        channels={team.channels}
                        users={[
                            { id: 1, name: "slackbot" },
                            { id: 2, name: "user1" },
                        ]}
                        onAddChannelClick={() => setToggleAddChannelModal(true)}
                        onInvitePeopleClick={() => setToggleInvitePeopleModal(true)}
                    />
                    <AddChannelModal
                        teamId={currentTeamId}
                        open={toggleAddChannelModal}
                        onClose={(e) => handleModalClose(e, setToggleAddChannelModal(false))}
                    />
                    <InvitePeopleModal
                        teamId={currentTeamId}
                        open={toggleInvitePeopleModal}
                        onClose={(e) => handleModalClose(e, setToggleInvitePeopleModal(false))}
                    />
                </Grid.Row>
            </Grid>
        </Sidebar>
    );
};

export default SidebarContainer;
