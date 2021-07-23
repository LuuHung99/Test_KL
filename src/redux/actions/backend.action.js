import axiosClient from "../../api";
import { backendContants } from "./constants";

export const getAllBackend = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("http://localhost:5000/api/root/backend");
    if (res.status === 200) {
      dispatch({
        type: backendContants.GET_ALL_BACKEND_SUCCESS,
        payload: {
          backends: res.data,
        },
      });
    }
  };
};

export const createBackend = (backend) => {
  return async (dispatch) => {
    const res = await axiosClient.put(
      "http://localhost:5000/api/root/backend",
      { backend }
    );
    if (res.status === 200) return true;
    return false;
  };
};
