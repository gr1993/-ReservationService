import axios from 'axios';
import { DOMAIN, axiosRequest, ResponseReturnType } from '../../helper/axiosHelper';
import { ReserveTicketType, SearchTicketType } from './ticketActionType';

interface AirlineReturn extends ResponseReturnType {
  data: {
    code: string;
    title: string;
  }[];
}

interface StartAirportReturn extends ResponseReturnType {
  data: {
    // eslint-disable-next-line camelcase
    start_airport: string;
    // eslint-disable-next-line camelcase
    end_airport: string;
  }[];
}

export const getTicketAirline = async (): Promise<AirlineReturn> => {
  const response = await axiosRequest(() => axios.get(`${DOMAIN}/ticket/airline`));

  return {
    data: response.data,
    success: response.success,
    msg: response.msg,
  };
};

export const getTicketAirport = async (type: string): Promise<StartAirportReturn> => {
  const response = await axiosRequest(() =>
    axios.get(`${DOMAIN}/ticket/airport/list?type=${type}`)
  );

  return {
    data: response.data,
    success: response.success,
    msg: response.msg,
  };
};

export const getTicketData = async (searchParam: SearchTicketType): Promise<ResponseReturnType> => {
  const response = await axiosRequest(() =>
    axios.get(`${DOMAIN}/ticket`, {
      params: searchParam,
    })
  );

  return {
    data: response.data,
    success: response.success,
    msg: response.msg,
  };
};

export const reserveTicket = async (
  accessToken: string,
  tickets: ReserveTicketType
): Promise<ResponseReturnType> => {
  const header = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const response = await axiosRequest(() =>
    axios.post(`${DOMAIN}/ticket/Reserve`, tickets, header)
  );

  return {
    data: response.data,
    success: response.success,
    msg: response.msg,
  };
};

export default {};
