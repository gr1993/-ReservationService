export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAUL';

export interface MemberRegisterType {
  id: string;
  password: string;
  name: string;
  mobile: string;
}

export interface memberLoginType {
  id: string;
  password: string;
}
