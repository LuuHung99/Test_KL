import { roleContants } from "../actions/constants";

const initialState = {
  roles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case roleContants.GET_ALL_ROLE_SUCCESS:
      state = {
        ...state,
        roles: action.payload.roles,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
