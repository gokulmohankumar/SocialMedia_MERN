import { toast } from "react-toastify";
import { API } from "./api";

export const loginAuth = async (userInfo, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await API.post("/auth/login", userInfo);
    console.log(res.data.userData);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data.userData,
    });

    // After successful login, fetch user data
    const userDataRes = await API.get(`/users/${res.data.userData._id}`);
    console.log("User Data:", userDataRes.data);

    // You can dispatch an action to store user data if needed
    // dispatch({ type: "SET_USER_DATA", payload: userDataRes.data });
  } catch (error) {
    toast.error("Wrong user credentials")
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error,
    });
  }
};

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};
