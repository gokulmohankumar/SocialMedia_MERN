// AuthActions.jsx
export const loginStart = () => ({
    type: "LOGIN_START",
  });
  
  export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
  });
  
  export const follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });
  
  export const updateUser = (user) => ({
    type: "UPDATE_USER",
    payload: user,
  });
  