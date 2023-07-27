/* eslint-disable */
import React from "react";
import { Header } from "semantic-ui-react";

const MainHeader = ({ channelName }) => (
    <div style={{ "gridColumn": 3, "gridRow": 1 }}>
        <Header textAlign="center">#{channelName}</Header>
    </div>
);

export default MainHeader;
