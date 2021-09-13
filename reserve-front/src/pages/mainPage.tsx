import React from 'react';
import styled from 'styled-components';
import CustomCard from '../components/customCard';
import CircleCard from '../components/circleCard';

const StyledMainDiv = styled.div`
  width: 100%;
  height: 450px;
  background-image:url('img/plane-4301615_1280.png');
  background-size:cover;
  background-repeat:no-repeat;
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
  border: 2px solid rgba(190, 190, 190, .5);
`;
const StyledCopyrightDiv = styled.div`
  font-size: 0.8em;
  margin: 5px 30px;
`;

function MainPage(): JSX.Element {
  return (
    <StyledMainDiv>
      <StyledCardDiv>
        <CustomCard
          title="추석 항공권 예약"
          text="코레일리 멤버십 회원만 예약 가능"
          timeText="이용시간 : 9.8~9.9 07:00~13:00"
          icon="FlightTakeoff"
          color="#35B2E8"
        />
        <br />
        <CustomCard
          title="평상시 항공권"
          text="누구나 이용 가능"
          timeText="이용시간 : 평상시"
          icon="default"
          color="#494AE6"
        />
      </StyledCardDiv>
      <StyledCircleDiv>
        <CircleCard
          icon="default"
          text="공지사항"
        />
        <CircleCard
          icon="reservation"
          text="예약방법안내"
        />
        <CircleCard
          icon="time"
          text="항공시각조회"
        />
        <CircleCard
          icon="rest"
          text="잔여석현황"
        />
      </StyledCircleDiv>
      <StyledFooterDiv>
        <div style={{ color: 'blue' }}>
          <b>🏳‍🌈 항공권 예약 유의사항</b>
        </div>
        <p style={{ lineHeight: '25px' }}>
          1. 추석 항공권 예약 전용 홈페이지는 Windows 운영체제(OS)와 크롬에 최적화 되어 있습니다.
          <br />
          2. Windows XP의 경우 단종, 보안 업그레이드 지원 중단 등의 사유로 본예약시스템이 정상적으로 작동하지 않을 수 있습니다.
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
    </StyledMainDiv>
  );
}

export default MainPage;
