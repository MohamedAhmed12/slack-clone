import React from "react";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
// import findIndex from "lodash/findIndex";

import CREATE_CHANNEL from "../graphql/channels/mutations/CREATE_CHANNEL";
import LIST_TEAMS from "../graphql/teams/queries/LIST_TEAMS";

const AddChannelModal = ({ teamId, open, onClose }) => {
    // eslint-disable-next-line
    const [createChannel, { data }] = useMutation(CREATE_CHANNEL);

    const handleSubmit = async (values, actions) => {
        try {
            await createChannel({
                variables: {
                    teamId: +teamId,
                    name: values.name,
                },
                optimisticResponse: {
                    createChannel: {
                        __typename: "ChannelResponse",
                        errors: null,
                        ok: true,
                        channel: {
                            id: "temp-id",
                            __typename: "Channel",
                            name: values.name,
                            public: true,
                        },
                    },
                },
                refetchQueries: [LIST_TEAMS, "listTeams"],
            });
            onClose();
            actions.setSubmitting(false);
        } catch (err) {
            console.log(1, err);
        }
    };

    return (
        <Modal onClose={onClose} open={open}>
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
                <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
                    {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <Input
                                    values={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    fluid
                                    disabled={isSubmitting}
                                    placeholder={"Channel name"}
                                />
                            </Form.Field>
                            <Form.Group widths={"equal"}>
                                <Button type="submit" fluid disabled={isSubmitting}>
                                    Create Channel
                                </Button>
                                <Button fluid disabled={isSubmitting} onClick={onClose}>
                                    Cancel
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
            </Modal.Content>
        </Modal>
    );
};

export default AddChannelModal;
