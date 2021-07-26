import React from 'react';
import styled from 'styled-components';
import CustomCard from '../components/customCard';

const StyledMainDiv = styled.div`
  width: 100%;
  height: 500px;
  background-image:url('img/plane-4301615_1280.png');
  background-size:cover;
  background-repeat:no-repeat;
`;
const StyledCardDiv = styled.div`
  padding: 40px 0px 0px 640px;
  overflow: hidden;
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
    </StyledMainDiv>
  );
}

export default MainPage;
