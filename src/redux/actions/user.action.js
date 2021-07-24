import axiosClient from "../../api";
import { userContants } from "./constants";

export const getAllUsers = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("http://localhost:5000/api/root/user");
    if (res.status === 200) {
      dispatch({
        type: userContants.GET_ALL_USER_SUCCESS,
        payload: {
          users: res.data,
        },
      });
    }
  };
};

export const createUsers = (user) => {
  return async (dispatch) => {
    const res = await axiosClient.put("http://localhost:5000/api/root/user", {user});
    if (res.status === 200) return true;
    return false;
  };
};

export const updateUser = (update) => {
  return async (dispatch) => {
    const res = await axiosClient.post(
      "http://localhost:5000/api/root/user/assignRole",
      {
        user: update,
      }
    );
    if (res.status === 200) return true;
    return false;
  };
};

export const updateActivedUser = (actived) => {
  return async (dispatch) => {
    const res = await axiosClient.post(
      "http://localhost:5000/api/root/user/activate",
      actived
    );
    if (res.status === 200) return true;
    return false;
  };
};
