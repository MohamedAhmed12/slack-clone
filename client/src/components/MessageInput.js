import React from "react";
import { Formik } from "formik";
import { Input } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import CREATE_MESSAGE from "../graphql/messages/mutations/CREATE_MESSAGE";

const MessageInput = ({ channel }) => {
    const [createMessage] = useMutation(CREATE_MESSAGE);

    const handleSubmit = async (values, actions) => {
        if (!values.message || !values.message.trim()) {
            actions.setSubmitting(false);
            return;
        }

        await createMessage({
            variables: {
                channelId: +channel.id,
                text: values.message,
            },
        });
        
        actions.resetForm(); 
        actions.setSubmitting(false);
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
                            value={values.message}
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
