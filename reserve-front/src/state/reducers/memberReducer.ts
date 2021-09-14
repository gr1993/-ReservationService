import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/memberActionType';

interface Action {
  type: string;
  payload: any;
}

interface InitialState {
  isLogin: boolean;
  accessToken: string | null;
}

const initialState: InitialState = {
  isLogin: false,
  accessToken: null,
};

const memberReducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default memberReducer;
