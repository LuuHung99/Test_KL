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

export const GetActiveBackend = () => {
  return async (dispatch) => {
    const res = await axiosClient.get(
      "http://localhost:5000/api/root/backend/activated"
    );
    if (res.status === 200) {
      dispatch({
        type: backendContants.GET_ALL_BACKEND_ACTIVE,
        payload: {
          backendActive: res.data,
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

export const updateBack = (backend) => {
  return async (dispatch) => {
    const res = await axiosClient.post(
      "http://localhost:5000/api/root/backend",
      { backend: backend }
    );
    if (res.status === 200) return true;
    return false;
  };
};

export const updateActivedBackend = (actived) => {
  return async (dispatch) => {
    const res = await axiosClient.put(
      "http://localhost:5000/api/root/funcLog",
      { log: actived }
    );
    if (res.status === 200) return true;
    return false;
  };
};
