import React, { useEffect, useState } from "react";
import { Button, Container, Header, Input, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../components/partials/hooks/useInput";
import { useMutation } from "@apollo/client";

import REGISTER_USER_MUTATION from "../graphql/users/mutations/REGISTER_USER";

const Register = () => {
    const { value: username, bind: bindUsername } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const [errors, setError] = useState({});

    // eslint-disable-next-line
    const [register, { data, loading, error }] = useMutation(REGISTER_USER_MUTATION);
    const onSubmit = async () => {
        await register({
            variables: {
                username,
                email,
                password,
            },
        });
    };

    useEffect(() => {
        if (data) {
            const { ok, errors } = data.register;

            if (ok) {
                const navigate = useNavigate();
                navigate.push("/");
            } else {
                setError(errors);
            }
        }
    }, [data]);

    return (
        <Container text textAlign="center">
            <Header as="h2">Register</Header>
            <Input placeholder="Username" {...bindUsername} fluid />
            <Input placeholder="Email" {...bindEmail} fluid />
            <Input type="password" placeholder="Password" {...bindPassword} fluid />
            <Button onClick={onSubmit}>Submit</Button>
            {errors.length && (
                <Message error header="Registeration Failed!" list={errors.map((e) => e.message)} />
            )}
        </Container>
    );
};

export default Register;
