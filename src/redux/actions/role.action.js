import axiosClient from "../../api";
import { roleContants } from "./constants";

export const getAllRoles = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("http://localhost:5000/api/root/role");
    if (res.status === 200) {
      dispatch({
        type: roleContants.GET_ALL_ROLE_SUCCESS,
        payload: {
          role: res.data,
        },
      });
    }
  };
};

export const createRoles = (role) => {
  return async (dispatch) => {
    const res = await axiosClient.put("http://localhost:5000/api/root/role", {
      role,
    });
    if (res.status === 200) return true;
    return false;
  };
};
