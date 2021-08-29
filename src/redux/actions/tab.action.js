import axiosClient from "../../api";
import { tabContants } from "./constants";

export const getAllTab = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("http://localhost:5000/api/root/tab");
    if (res.status === 200) {
      dispatch({
        type: tabContants.GET_TAB_SUCCESS,
        payload: {
          tabs: res.data,
        },
      });
    }
  };
};

export const createFrontend = (tab) => {
  return async (dispatch) => {
    const res = await axiosClient.put(
      "http://localhost:5000/api/root/tab",
      { tab }
    );
    if (res.status === 200) return true;
    return false;
  };
};

export const updateFe = (frontend) => {
  return async (dispatch) => {
    const res = await axiosClient.post(
      "http://localhost:5000/api/root/tab",
      { tab: frontend }
    );
    if (res.status === 200) return true;
    return false;
  };
};

export const updateActivedFrontend = (actived) => {
  return async (dispatch) => {
    const res = await axiosClient.put(
      "http://localhost:5000/api/root/funcLog",
      { log: actived }
    );
    if (res.status === 200) return true;
    return false;
  };
};
