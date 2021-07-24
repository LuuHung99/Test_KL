import axiosClient from "../../api";
import { roleContants } from "./constants";

export const getAllRoles = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("http://localhost:5000/api/root/role");
    if (res.status === 200) {
      dispatch({
        type: roleContants.GET_ALL_ROLE_SUCCESS,
        payload: {
          roles: res.data,
        },
      });
    }
  };
};

export const getAllActveRoles = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("http://localhost:5000/api/root/role/activated");
    if (res.status === 200) {
      dispatch({
        type: roleContants.GET_ALL_ACTIVE_ROLE,
        payload: {
          activeRoles: res.data,
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

export const updateRole = (update) => {
  return async (dispatch) => {
    const res = await axiosClient.post("http://localhost:5000/api/root/role", {
      role: update,
    });
    if (res.status === 200) return true;
    return false;
  };
};

export const updateActivedRole = (actived) => {
  return async (dispatch) => {
    const res = await axiosClient.post(
      "http://localhost:5000/api/root/role/activate",
      actived
    );
    if (res.status === 200) return true;
    return false;
  };
};

 
