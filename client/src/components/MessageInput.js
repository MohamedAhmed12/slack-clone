import React from "react";
import { Formik } from "formik";
import { Input } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import CREATE_MESSAGE from "../graphql/messages/mutations/CREATE_MESSAGE";

const MessageInput = ({ channel }) => {
    const [createMessage] = useMutation(CREATE_MESSAGE);

    const handleSubmit = async ({ message }, actions) => {
        if (!message || !message.trim()) {
            actions.setSubmitting(false);
            return;
        }

        await createMessage({
            variables: {
                channelId: +channel.id,
                text: message,
            },
        });
        actions.resetForm();
    };

    return (
        <span>
           
            <Formik initialValues={{ message: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
                    <div className="send-message-wrapper">
                        <Input
                            onKeyDown={(e) => {
                                if (e.key == "Enter" && !isSubmitting) {
                                    handleSubmit();
                                }
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="message"
                            values={values.message}
                            fluid
                            placeholder={`Message #${channel.name}`}
                        />
                    </div>
                )}
            </Formik>
        </span>
    );
};

export default MessageInput;
