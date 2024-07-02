// AllUserContext.jsx

import React, { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
import { getAllUsers } from "../Utils/Api/api";
import { setUsers } from "./UserActions";

const INITIAL_STATE = {
    users: [],
};

export const AllUserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                dispatch(setUsers(response.data.users));
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <AllUserContext.Provider
            value={{
                users: state.users,
                dispatch,
            }}
        >
            {children}
        </AllUserContext.Provider>
    );
};
