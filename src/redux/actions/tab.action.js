import axiosClient from "../../api";
import { tabContants } from "./constants";

export const getAllTab = () => {
  return async (dispatch) => {
    const url = "http://localhost:5000/api/root/tab";
    const res = await axiosClient.get(url);
    if (res.status === 200) {
      dispatch({
        type: tabContants.GET_TAB_SUCCESS,
        payload: {
          tab: res.data,
        },
      });
    }
  };
};
