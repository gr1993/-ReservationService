import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import dateformat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from 'styled-components';
import { cancelTicket, getReservationData, getTicketAirline } from '../state/actions/ticketAction';
import { RootReducerType } from '../state/store';

const StyledMainDiv = style.div`
  margin: 0px auto;
  width: 100%;
  height: 500px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;
  text-align: center;
`;

const StyledMenuDiv = style.div`
  font-size: 2.0em;
  margin-bottom: 50px;
`;
const StyledFont = style.b`
  color: orange;
  font-size: 1.5em;
`;

const columns = [
  { field: 'id', hide: true },
  { field: 'airline', headerName: '항공사', width: 100, sortable: false },
  { field: 'start_airport', headerName: '출발지', width: 120, sortable: false },
  { field: 'end_airport', headerName: '도착지', width: 120, sortable: false },
  { field: 'start_date', headerName: '출발일', width: 120, sortable: false },
  { field: 'start_time', headerName: '출발시간', width: 110, sortable: false },
  { field: 'end_time', headerName: '도착시간', width: 110, sortable: false },
  { field: 'price', headerName: '금액', width: 120, sortable: false },
  { field: 'count', headerName: '좌석수', width: 100, sortable: false },
];

const CheckPage = (): JSX.Element => {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  const [ticketData, setTicketData] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  const loadReservationData = async () => {
    if (!memberReducer.accessToken) {
      alert('로그인 후 이용이 가능합니다.');
      history.push('/login');
      return;
    }

    const codes = await getTicketAirline();
    const response = await getReservationData(memberReducer.accessToken);

    if (codes.success && response.success) {
      const data = response.data.map((d: any) => {
        const airlineName = codes.data.find((f) => f.code === d.airline)?.title;
        const startDateString = dateformat(d.start_date, 'yyyy-mm-dd');
        const startTimeString = dateformat(d.start_date, 'hh:MM');
        let endDate = new Date(d.start_date).getTime();
        endDate += d.duration_time * 60 * 60 * 1000;
        const emdTimeString = dateformat(new Date(endDate), 'hh:MM');
        const priceString = d.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const countString = d.count.toString();

        return {
          id: d.srl,
          airline: airlineName,
          start_airport: d.start_airport,
          end_airport: d.end_airport,
          start_date: startDateString,
          start_time: startTimeString,
          end_time: emdTimeString,
          price: priceString,
          count: countString,
        };
      });
      setTicketData(data);
    }
  };

  useEffect(() => {
    loadReservationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectionModelChange = (selectionModel: any) => {
    setSelectedTickets(selectionModel);
  };

  const cancelTicketAction = async () => {
    if (selectedTickets.length === 0) {
      alert('예약취소할 항공권 선택하세요');
      return;
    }
    if (!memberReducer.accessToken) {
      alert('로그인 후 이용이 가능합니다.');
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm('선택된 항공권을 예약취소하시겠습니까?')) {
      const response = await cancelTicket(memberReducer.accessToken, selectedTickets);
      alert(response.msg);
      loadReservationData();
    }
  };

  return (
    <div>
      <StyledMenuDiv>
        <b>예약내역(확인/취소)</b>
      </StyledMenuDiv>
      <StyledMainDiv>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={ticketData}
            columns={columns}
            pageSize={3}
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
            onSelectionModelChange={onSelectionModelChange}
          />
        </div>
        <div style={{ marginTop: '30px' }}>
          <StyledFont>결제기간: 2021.9.20.(월) 07:00 ~ 2021.9.22.(수) 13:00</StyledFont>
        </div>
        <div>
          <b>기간 내 미결제 시 승차권 자동 취소</b>
        </div>
        <Button
          style={{ margin: '20px 0px', width: '150px', height: '60px' }}
          className="ButtonStyle"
          variant="contained"
          color="primary"
          onClick={cancelTicketAction}
        >
          취소하기
        </Button>
      </StyledMainDiv>
    </div>
  );
};

export default CheckPage;
