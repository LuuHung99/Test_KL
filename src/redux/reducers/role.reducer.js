import { roleContants } from "../actions/constants";

const initialState = {
  roles: [],
  activeRole: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case roleContants.GET_ALL_ROLE_SUCCESS:
      state = {
        ...state,
        roles: action.payload.roles,
      };
      break;
    case roleContants.GET_ALL_ACTIVE_ROLE:
      state = {
        ...state,
        activeRole: action.payload.activeRoles,
      };
      break;
    case roleContants.ADD_ROLE_SUCCESS:
      const newRole = [...state.roles, action.payload.roles];
      state = {
        ...state,
        roles: newRole,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
