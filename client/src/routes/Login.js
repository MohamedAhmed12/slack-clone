import React, { useEffect, useState } from "react";
import { Button, Container, Header, Input, Message } from "semantic-ui-react";
// import { useNavigate } from "react-router-dom";
import { useInput } from "../components/partials/hooks/useInput";
import { useMutation } from "@apollo/client";

import LOGIN_USER_MUTATION from "../graphql/users/mutations/LOGIN_USER";

const Login = () => {
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const [errors, setError] = useState({});

    // eslint-disable-next-line
    const [login, { data, loading, error }] = useMutation(LOGIN_USER_MUTATION);
    const onSubmit = async () => {
        await login({
            variables: {
                email,
                password,
            },
        });
    };

    useEffect(() => {
        if (data) {
            const { ok, errors, token, refreshToken } = data.login;

            if (ok) {
                setError({});
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                // const navigate = useNavigate();
                // navigate.push("/");
            } else {
                setError(errors);
            }
        }
    }, [data]);

    return (
        <Container text textAlign="center">
            <Header as="h2">Login</Header>
            <Input placeholder="Email" {...bindEmail} fluid />
            <Input type="password" placeholder="Password" {...bindPassword} fluid />
            <Button onClick={onSubmit}>Submit</Button>
            {errors.length && (
                <Message error header="Registeration Failed!" list={errors.map((e) => e.message)} />
            )}
        </Container>
    );
};

export default Login;
