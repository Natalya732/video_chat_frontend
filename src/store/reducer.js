import actionTypes from "./actionTypes";

const initialState = {
  user: {},
  isMobileView: false,
  theme: "light",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN: {
      return { ...state, user: { ...action.user } };
    }
    case actionTypes.USER_LOGOUT: {
      return { user: {} };
    }
    case actionTypes.SET_MOBILE_VIEW: {
      return { ...state, isMobileView: action.isMobileView ? true : false };
    }
    case actionTypes.SET_THEME: {
      return { ...state, theme: action.theme };
    }

    default:
      return state;
  }
};

export default rootReducer;
