import { userContants } from "../actions/constants";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userContants.GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case userContants.ADD_USER_SUCCESS:
      const newUser = [...state.users, action.payload.users];
      state = {
        ...state,
        users: newUser,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
