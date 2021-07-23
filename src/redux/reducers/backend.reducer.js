import { backendContants } from "../actions/constants";

const initialState = {
  backends: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case backendContants.GET_ALL_BACKEND_SUCCESS:
      state = {
        ...state,
        backends: action.payload.backends,
      };
      break;
    case backendContants.ADD_BACKEND_SUCCESS:
      const newBackend = [...state.backends, action.payload.backends];
      console.log(newBackend);
      state = {
        ...state,
        backends: newBackend,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
