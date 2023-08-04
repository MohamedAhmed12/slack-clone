import React from "react";
import { Modal, Input, Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";

import ADD_MEMBER from "../graphql/teams/mutations/ADD_MEMBER";
import normalizeErrors from "../helper/normalizeErrors";

const InvitePeopleModal = ({ teamId, open, onClose }) => {
    const [addMember] = useMutation(ADD_MEMBER);

    const handleSubmit = async (values, actions) => {
        const res = await addMember({
            variables: {
                teamId: +teamId,
                email: values.email,
            },
            optimisticResponse: {
                addMember: {
                    __typename: "VoidResponse",
                    errors: null,
                    ok: true,
                },
            },
        });

        const { ok, errors } = res.data.addMember;

        if (ok) {
            onClose();
            actions.setSubmitting(false);
        } else {
            actions.setSubmitting(false);
            actions.setErrors(normalizeErrors(errors));
        }
    };

    return (
        <Modal onClose={onClose} open={open}>
            <Modal.Header>Add People to your team</Modal.Header>
            <Modal.Content>
                <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                    {({
                        values,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        errors,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <Input
                                    values={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    fluid
                                    disabled={isSubmitting}
                                    placeholder={"User's email"}
                                />
                            </Form.Field>

                            {touched.email && errors.email ? errors.email[0] : ""}

                            <Form.Group widths={"equal"}>
                                <Button type="submit" fluid disabled={isSubmitting}>
                                    Add User
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

export default InvitePeopleModal;
