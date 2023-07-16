import React from "react";
import { gql, useQuery } from "@apollo/client";

const allUsersQuery = gql`
    query {
        allUsers {
            id
            email
            username
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(allUsersQuery);

    if (loading) return "Loaidng...";
    if (error) return "Erorr :(";

    return data.allUsers.map((user) => (
        <h1 key={user.id}>
            {user.username} - {user.email}
        </h1>
    ));
};

export default Home;
