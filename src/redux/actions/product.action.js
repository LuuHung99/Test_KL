import axiosClient from "../../api";
import { createCategories } from "../../services/middlewares";
import { productContants } from "./constants";

export const getAllProducts = () => {
  return async (dispatch) => {
    const res1 = await axiosClient.get("/root/sidebar");
    const res2 = await axiosClient.get("/root/tab");
    if (res1.status === 200 && res2.status === 200) {
      dispatch({
        type: productContants.GET_PRODUCT_SUCCESS,
        payload: {
          sidebar: createCategories(res1.data.concat(res2.data)),
          products: res2.data,
        },
      });
    }
  };
};
