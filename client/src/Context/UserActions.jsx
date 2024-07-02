export const setUsers = (users) => ({
    type: "SET_USERS",
    payload: users,
});

export const updateUser = (user) => ({
    type: "UPDATE_USER",
    payload: user,
});

export const deleteUser = (userId) => ({
    type: "DELETE_USER",
    payload: userId,
});
