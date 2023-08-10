import React, { useContext, useEffect, useState } from "react";
import { Segment, Sidebar } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../assets/layouts/main.scss";
import SidebarContainer from "../containers/Sidebar";
import { CustomContext } from "../context";
import LIST_TEAMS from "../graphql/teams/queries/LIST_TEAMS";

const MainLayout = ({ ChildComponent }) => {
    const { teamId, channelId } = useParams();
    const [teams, setTeams] = useState([]);
    const { currentTeam, setCurrentTeam, setCurrentChannel } = useContext(CustomContext);
    const { loading, data } = useQuery(LIST_TEAMS, { fetchPolicy: "network-only" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && data) {
            const teams = data.listTeams;
            if (teams.length == 0) return navigate("/create-team");

            const team = teams.find((team) => team.id === teamId) || teams[0];
            const channel =
                team.channels.find((channel) => channel.id === channelId) || team.channels[0];

            setTeams(teams);
            setCurrentTeam(team);
            setCurrentChannel(channel);
        }
    }, [loading, teamId, channelId]);

    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            {teams.length > 0 && currentTeam && (
                <SidebarContainer teams={teams} team={currentTeam} />
            )}

            <Sidebar.Pusher>
                <Segment basic>{ChildComponent}</Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
