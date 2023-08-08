import { React } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import MainHeader from "../components/header/MainHeader";
import MessageInput from "../components/MessageInput";
import MainLayout from "../layouts/main";
import LIST_TEAMS from "../graphql/teams/queries/LIST_TEAMS";
import MessagesContainer from "../containers/MessagesContainer";

const ViewTeam = () => {
    const { teamId, channelId } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(LIST_TEAMS, { fetchPolicy: "network-only" });

    if (loading) return null;

    const teams = data.listTeams;
    if (!teams.length) return <Navigate to={"/create-team"} />;

    const team = teams.find((team) => team.id == teamId) || teams[0];
    const channel = team.channels.find((channel) => channel.id == channelId) || team.channels[0];

    return (
        <MainLayout
            teams={teams}
            team={team}
            ChildComponent={
                channel && (
                    <span>
                        <MainHeader channelName={"general"} />
                        <MessagesContainer channelId={channel.id}/>
                        <MessageInput channel={channel} />
                    </span>
                )
            }
        />
    );
};

export default ViewTeam;
