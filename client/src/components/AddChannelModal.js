import React from "react";
import { Modal, Input, Button, Form } from "semantic-ui-react";

const AddChannelModal = ({ open, onClose }) => {
    return (
        <Modal onClose={onClose} open={open}>
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input fluid placeholder={"Channel name"} />
                    </Form.Field>
                    <Form.Group widths={"equal"}>
                        <Button fluid>Create Channel</Button>
                        <Button fluid>Cancel</Button>
                    </Form.Group>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default AddChannelModal;
