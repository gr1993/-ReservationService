import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import CustomCard from '../components/customCard';
import CircleCard from '../components/circleCard';
import { RootReducerType } from '../state/store';
import SimpleModal from '../components/modal';

const StyledMainDiv = styled.div`
  width: 100%;
  height: 450px;
  background-image: url('img/plane-4301615_1280.png');
  background-size: cover;
  background-repeat: no-repeat;
`;
const StyledCardDiv = styled.div`
  padding: 40px 0px 0px 640px;
  overflow: hidden;
`;
const StyledCircleDiv = styled.div`
  margin-top: 65px;
`;
const StyledFooterDiv = styled.div`
  margin: 30px 30px 0px 30px;
  padding: 15px;
  width: calc(100% - 90px);
  height: 140px;
  border: 2px solid rgba(190, 190, 190, 0.5);
`;
const StyledCopyrightDiv = styled.div`
  font-size: 0.8em;
  margin: 5px 30px;
`;

function MainPage(): JSX.Element {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);
  const [seq, setSeq] = useState(1);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  const reservationEvent = () => {
    if (!memberReducer.accessToken) {
      alert('로그인 후 이용이 가능합니다.');
      return;
    }

    const localSocket = io('ws://localhost:8080', {
      transports: ['websocket'],
      jsonp: false,
      query: {
        token: memberReducer.accessToken,
      },
    });

    localSocket.emit('enterWaiting');
    setOpen(true);

    const id = window.setInterval(() => {
      if (localSocket) {
        localSocket.emit('check');
      }
    }, 300);

    localSocket.on('check', (data: any) => {
      if (data.isContained) {
        setSeq(data.index + 1);
      }
    });

    localSocket.on('enterTicketing', () => {
      setOpen(false);
      localSocket.disconnect();
      window.clearInterval(id);
      history.push('/reserve');
    });

    setSocket(localSocket);
  };

  const onCloseClick = () => {
    setOpen(false);
    if (!socket) {
      return;
    }
    socket.disconnect();
  };

  return (
    <StyledMainDiv>
      <StyledCardDiv>
        <CustomCard
          title="추석 항공권 예약"
          text="코레일리 멤버십 회원만 예약 가능"
          timeText="이용시간 : 9.20~9.22 07:00~13:00"
          icon="FlightTakeoff"
          color="#35B2E8"
          onClickEvent={reservationEvent}
        />
        <br />
        <CustomCard
          title="평상시 항공권"
          text="누구나 이용 가능"
          timeText="이용시간 : 평상시"
          icon="default"
          color="#494AE6"
          onClickEvent={() => {
            alert('준비중입니다...');
          }}
        />
      </StyledCardDiv>
      <StyledCircleDiv>
        <CircleCard icon="default" text="공지사항" />
        <CircleCard icon="reservation" text="예약방법안내" />
        <CircleCard icon="time" text="항공시각조회" />
        <CircleCard icon="rest" text="잔여석현황" />
      </StyledCircleDiv>
      <StyledFooterDiv>
        <div style={{ color: 'blue' }}>
          <b>🏳‍🌈 항공권 예약 유의사항</b>
        </div>
        <p style={{ lineHeight: '25px' }}>
          1. 추석 항공권 예약 전용 홈페이지는 Windows 운영체제(OS)와 크롬에 최적화 되어 있습니다.
          <br />
          2. Windows XP의 경우 단종, 보안 업그레이드 지원 중단 등의 사유로 본예약시스템이 정상적으로
          작동하지 않을 수 있습니다.
          <br />
          3. 예약 전용 화면은 하나의 인터넷창에서만 접속할 수 있습니다.
          <br />
          4.
          <b style={{ color: 'red' }}> 해당 페이지는 학습 목적으로 제작되었습니다!</b>
        </p>
      </StyledFooterDiv>
      <StyledCopyrightDiv>
        <b style={{ float: 'right' }}> KORAILI | Copyright 2021.KangLim. All rights reserved.</b>
      </StyledCopyrightDiv>
      <SimpleModal seq={seq} open={open} onClickEvent={onCloseClick} />
    </StyledMainDiv>
  );
}

export default MainPage;
