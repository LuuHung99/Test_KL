import { productContants } from "../actions/constants";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productContants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      console.log(state);
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
