import React, { useEffect, useState } from "react";
import { Button, Container, Header, Input, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../components/partials/hooks/useInput";
import { useMutation } from "@apollo/client";

import CREATE_TEAM_MUTATION from "../graphql/teams/mutations/CREATE_TEAM";

const CreateTeam = () => {
    const { value: name, bind: bindName } = useInput("");
    const [errors, setError] = useState({});
    const navigate = useNavigate();

    const [createTeam, { data }] = useMutation(CREATE_TEAM_MUTATION);
    const onSubmit = async () => {
        try {
            await createTeam({
                variables: {
                    name,
                },
            });
        } catch (error) {
            setError(error);
            navigate("/login");
        }
    };

    useEffect(() => {
        if (data) {
            const { ok, errors, team } = data.createTeam;

            if (ok) {
                setError({});
                navigate(`/view-team/${team.id}`);
            } else {
                setError(errors);
            }
        }
    }, [data]);

    return (
        <Container text textAlign="left">
            <Header as="h2">Create a team</Header>
            <Input placeholder="Name" {...bindName} fluid />
            <Button onClick={onSubmit}>Submit</Button>
            {errors.length && (
                <Message error header="Team Creation Failed!" list={errors.map((e) => e.message)} />
            )}
        </Container>
    );
};

export default CreateTeam;
