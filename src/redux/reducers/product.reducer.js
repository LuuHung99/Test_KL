import { productContants } from "../actions/constants";

const initialState = {
  sidebar: [],
  tabs: [],
  historyTab: [],
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

    case productContants.GET_TAB_SESSION_SUCCESS:
      state = {
        ...state,
        historyTab: action.payload.historyTab,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
