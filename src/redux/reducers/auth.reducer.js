import { authContants } from "../actions/constants";

const initialState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authContants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authContants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authContants.LOGOUT_SUCCES:
      state = {
        ...initialState,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
