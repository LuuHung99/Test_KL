import { tabContants } from "../actions/constants";

const initialState = {
  tabs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case tabContants.GET_TAB_SUCCESS:
      state = {
        ...state,
        tabs: action.payload.tabs,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
