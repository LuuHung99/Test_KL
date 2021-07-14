import { productContants } from "../actions/constants";

const initialState = {
  siderbar: [],
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productContants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        siderbar: action.payload.siderbar,
        products: action.payload.products,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
