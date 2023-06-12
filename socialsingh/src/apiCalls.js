import axios from "axios";

export const loginHandler = async (userCredential, dispatch) => {
  dispatch({ type: "LOGGING_IN" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAIL", payload: err });
  }
};