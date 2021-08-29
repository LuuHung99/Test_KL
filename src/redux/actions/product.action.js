import axiosClient from "../../api";
import { createCategories } from "../../services/middlewares";
import { productContants } from "./constants";

export const getAllProducts = (user) => {
  return async (dispatch) => {
    const res1 = await axiosClient.get("/root/sidebar");
    const res2 = await axiosClient.get("/root/tab");
    if (res1.status === 200 && res2.status === 200) {
      dispatch({
        type: productContants.GET_PRODUCT_SUCCESS,
        payload: {
          sidebar: createCategories(res1.data.concat(res2.data)),
          tabs: createCategories(res1.data),
        },
      });
    }
  };
};

export const getTabSession = () => {
  return async (dispatch) => {
    const tabs = await window.sessionStorage.getItem("tabs");
    if (tabs) {
      const data = JSON.parse(tabs).data;
      dispatch({
        type: productContants.GET_TAB_SESSION_SUCCESS,
        payload: { historyTab: data },
      });
    }
  };
};
