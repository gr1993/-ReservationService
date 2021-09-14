import axios from 'axios';
import { MemberRegisterType, memberLoginType } from './memberActionType';
import { axiosRequest, ResponseReturnType } from '../../helper/axiosHelper';

const DOMAIN = 'http://localhost:8080';

export const memberRegister = async (member: MemberRegisterType): Promise<ResponseReturnType> => {
  const response = await axiosRequest(() => axios.post(`${DOMAIN}/member`, member));

  return {
    success: response.success,
    msg: response.msg,
  };
};

export const memberLogin = async (member: memberLoginType): Promise<ResponseReturnType> => {
  const response = await axiosRequest(() => axios.post(`${DOMAIN}/auth/login`, member));

  return {
    data: {
      accessToken: response.data && response.data.access_token,
    },
    success: response.success,
    msg: response.msg,
  };
};

export default {};
