import axiosClient from "../../api";
import { createCategories } from "../../services/middlewares";
import { productContants } from "./constants";

export const getALlProducts = () => {
  return async (dispatch) => {
    const res1 = await axiosClient.get("/root/tab/activated");
    const res2 = await axiosClient.get("/root/sidebar");
    if (res1.status === 200 && res2.status === 200) {
      dispatch({
        type: productContants.GET_PRODUCT_SUCCESS,
        payload: {
          products: createCategories(res2.data.concat(res1.data)),
        },
      });
    }
  };
};
