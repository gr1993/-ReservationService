import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from 'styled-components';
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
  { field: 'rest', headerName: '잔여석', width: 100, sortable: false },
];

const CheckPage = (): JSX.Element => {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  const [ticketData, setTicketData] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  useEffect(() => {
    if (!memberReducer.accessToken) {
      alert('로그인 후 이용이 가능합니다.');
      history.push('/login');
      // return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectionModelChange = (selectionModel: any) => {
    setSelectedTickets(selectionModel);
  };

  const reserveTicketAction = async () => {
    // if (!memberCount) {
    //   alert('인원을 입력하세요.');
    //   return;
    // }
    // if (selectedTickets.length === 0) {
    //   alert('예약할 항공권 선택하세요');
    //   return;
    // }
    // if (!memberReducer.accessToken) {
    //   alert('로그인 후 이용이 가능합니다.');
    //   return;
    // }
    // eslint-disable-next-line no-restricted-globals
    // if (confirm('선택된 항공권을 예약하시겠습니까?')) {
    //   const response = await reserveTicket(memberReducer.accessToken, {
    //     ticketSrls: selectedTickets,
    //     count: Number(memberCount),
    //   });
    //   alert(response.msg);
    // }
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
          onClick={reserveTicketAction}
        >
          취소하기
        </Button>
      </StyledMainDiv>
    </div>
  );
};

export default CheckPage;
