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
