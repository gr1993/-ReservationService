import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/memberActionType';

interface Action {
  type: string;
  payload: any;
}

interface InitialState {
  isLogin: boolean;
  token: string | null;
}

const initialState: InitialState = {
  isLogin: false,
  token: null,
};

const memberReducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        token: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default memberReducer;
