import { productContants } from "../actions/constants";

const initialState = {
  sidebar: [],
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productContants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        sidebar: action.payload.sidebar,
        products: action.payload.products,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
