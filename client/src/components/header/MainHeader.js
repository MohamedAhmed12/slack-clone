import React from "react";
import { Header } from "semantic-ui-react";

const MainHeader = ({ channelName }) => (
    <div>
        <Header textAlign="center">#{channelName}</Header>
    </div>
);

export default MainHeader;
