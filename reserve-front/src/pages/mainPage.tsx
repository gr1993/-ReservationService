import React from 'react';
import styled from 'styled-components';
import CustomCard from '../components/customCard';

const StyledDiv = styled.div`
  width: 100%;
  height: 500px;
  background-image:url('img/plane-4301615_1280.png');
  background-size:cover;
  background-repeat:no-repeat;
`;

function MainPage(): JSX.Element {
  return (
    <StyledDiv>
      <CustomCard
        title="추석 승차권 예약"
        text="코레일리 멤버십 회원만 예약 가능"
        timeText="이용시간 : 9.8~9.9 07:00~13:00"
        icon="FlightTakeoff"
      />
      <CustomCard
        title="추석 승차권 예약"
        text="코레일리 멤버십 회원만 예약 가능"
        timeText="이용시간 : 9.8~9.9 07:00~13:00"
        icon="default"
        color="#494AE6"
      />
    </StyledDiv>
  );
}

export default MainPage;
