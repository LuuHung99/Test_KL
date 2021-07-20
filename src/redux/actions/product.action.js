import axiosClient from "../../api";
import { createCategories } from "../../services/middlewares";
import { productContants } from "./constants";

export const getAllProducts = () => {
  return async (dispatch) => {
    const res1 = await axiosClient.get("/root/tab/activated");
    const res2 = await axiosClient.get("/root/sidebar");
    const res3 = await axiosClient.get("/root/tab");
    if (res1.status === 200 && res2.status === 200 && res3.status === 200) {
      dispatch({
        type: productContants.GET_PRODUCT_SUCCESS,
        payload: {
          siderbar: createCategories(res1.data.concat(res2.data)),
          products: res3.data,
        },
        
      });
    }
  };
};
