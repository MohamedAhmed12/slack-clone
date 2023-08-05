/* eslint-disable */
import React from "react";
import { Segment, Sidebar } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import "../assets/layouts/main.scss";
import SidebarContainer from "../containers/Sidebar";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import LIST_TEAMS from "../graphql/teams/queries/LIST_TEAMS";

const MainLayout = ({ ChildComponent }) => {
    const { channelId, teamId } = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(LIST_TEAMS, { fetchPolicy: "network-only" });

    if (loading) return null;

    const teams = data.listTeams;
    if (!teams.length) return <Navigate to={"/create-team"} />;

    return (
        <Sidebar.Pushable as={Segment} className="main-layout">
            <SidebarContainer teams={teams} currentTeamId={teamId} />
            <Sidebar.Pusher>
                <Segment basic>{ChildComponent} </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};

export default MainLayout;
