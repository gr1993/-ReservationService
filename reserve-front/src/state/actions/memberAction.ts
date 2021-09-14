import axios from 'axios';
import { MemberRegisterType, memberLoginType } from './memberActionType';

interface ResponseReturnType {
  data?: any;
  success: boolean;
  msg?: string;
}

const DOMAIN = 'http://localhost:8080';

export const memberRegister = async (member: MemberRegisterType): Promise<ResponseReturnType> => {
  try {
    const response = await axios.post(`${DOMAIN}/member`, member);

    return {
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (err) {
    return {
      success: false,
      msg: '서버와 연결에 실패하였습니다.',
    };
  }
};

export const memberLogin = async (member: memberLoginType): Promise<ResponseReturnType> => {
  try {
    const response = await axios.post(`${DOMAIN}/auth/login`, member);

    return {
      data: {
        accessToken: response.data.data.access_token,
      },
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (err) {
    return {
      success: false,
      msg: '서버와 연결에 실패하였습니다.',
    };
  }
};

export default {};
