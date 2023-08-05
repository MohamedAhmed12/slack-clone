import React from "react";

const Messages = () => (
    <ul
        className="message-list"
        style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
        }}
    >
        <li
            style={{
                backgroundColor: "#f0f0f0",
                padding: "5px 10px",
                marginBottom: "5px",
            }}
        />
        <li
            style={{
                backgroundColor: "#f0f0f0",
                padding: "5px 10px",
                marginBottom: "5px",
            }}
        />
    </ul>
);

export default Messages;
