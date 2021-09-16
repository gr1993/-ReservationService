import axios from 'axios';
import { MemberRegisterType, MemberLoginType, MemberUpdateType } from './memberActionType';
import { DOMAIN, axiosRequest, ResponseReturnType } from '../../helper/axiosHelper';

export const memberRegister = async (member: MemberRegisterType): Promise<ResponseReturnType> => {
  const response = await axiosRequest(() => axios.post(`${DOMAIN}/member`, member));

  return {
    success: response.success,
    msg: response.msg,
  };
};

export const memberLogin = async (member: MemberLoginType): Promise<ResponseReturnType> => {
  const response = await axiosRequest(() => axios.post(`${DOMAIN}/auth/login`, member));

  return {
    data: {
      accessToken: response.data && response.data.access_token,
    },
    success: response.success,
    msg: response.msg,
  };
};

export const memberSelect = async (accessToken: string): Promise<ResponseReturnType> => {
  const header = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const response = await axiosRequest(() => axios.get(`${DOMAIN}/member/info`, header));

  return {
    data: response.data,
    success: response.success,
    msg: response.msg,
  };
};

// eslint-disable-next-line max-len
export const memberUpdate = async (
  accessToken: string,
  member: MemberUpdateType
): Promise<ResponseReturnType> => {
  const header = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const response = await axiosRequest(() => axios.put(`${DOMAIN}/member`, member, header));

  return {
    success: response.success,
    msg: response.msg,
  };
};

export default {};
