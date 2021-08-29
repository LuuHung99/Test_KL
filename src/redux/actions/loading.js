import { SHOWLOADING, HIDELOADING } from "./constants";

export const showLoading = () => {
  return {
    type: SHOWLOADING,
  };
};

export const hideLoading = () => {
  return {
    type: HIDELOADING,
  };
};
