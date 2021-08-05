import { productContants } from "../actions/constants";

const initialState = {
  sidebar: [],
  tabs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productContants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        sidebar: action.payload.sidebar,
        tabs: action.payload.tabs,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
