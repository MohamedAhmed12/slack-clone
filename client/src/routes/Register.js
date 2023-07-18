import React from "react";
import { Button, Container, Header, Input } from "semantic-ui-react";
import { useInput } from "../components/partials/hooks/useInput";
import { useMutation } from "@apollo/client";

import REGISTER_USER_MUTATION from "../graphql/users/mutations/REGISTER_USER";

const Register = () => {
    const { value: username, bind: bindUsername } = useInput("");
    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");

    // eslint-disable-next-line
    const [register, { data, loading, error }] = useMutation(REGISTER_USER_MUTATION);
    const onSubmit = async () => {
        const res = await register({
            variables: {
                username,
                email,
                password,
            },
        });

        console.log(res);
    };

    return (
        <Container text textAlign="center">
            <Header as="h2">Register</Header>
            <Input placeholder="Username" {...bindUsername} fluid />
            <Input placeholder="Email" {...bindEmail} fluid />
            <Input type="password" placeholder="Password" {...bindPassword} fluid />
            <Button onClick={onSubmit}>Submit</Button>
        </Container>
    );
};

export default Register;
