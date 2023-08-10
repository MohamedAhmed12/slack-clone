import { React, createContext, useState } from "react";

export const CustomContext = createContext();

export const CustomContextProvider = ({ children }) => {
    const [currentTeam, setCurrentTeam] = useState({});
    const [currentChannel, setCurrentChannel] = useState({});

    const value = {
        currentTeam,
        setCurrentTeam,
        currentChannel,
        setCurrentChannel
    }

    return <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
};
