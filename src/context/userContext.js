import React from 'react';


const UserContext = React.createContext({});

export const UserProvider = UserContext.Provider;
export const Consumer = UserContext.Consumer;

export default UserContext;