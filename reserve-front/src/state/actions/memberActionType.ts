export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export interface MemberRegisterType {
  id: string;
  password: string;
  name: string;
  mobile: string;
}

export interface MemberLoginType {
  id: string;
  password: string;
}

export interface MemberUpdateType {
  password?: string;
  name: string;
  mobile: string;
}
