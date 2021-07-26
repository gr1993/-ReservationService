import React from 'react';
import styled from 'styled-components';

const StyledMainDiv = styled.div`
  padding: 15px;
  height: calc(100% - 30px);
`;
const StyledTopDiv = styled.div`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;
const StyledBottonDiv = styled.div`
  margin-top: 35px;
  color: #fff;
  font-size: 0.8em;
  font-weight: 300;
`;
const StyledFooterDiv = styled.div`
  color: #fff;
  font-size: 0.8em;
  font-weight: 300;
`;

interface Props {
  title: string;
  text: string;
  timeText: string;
}

const CardText: React.FC<Props> = ({ title, text, timeText }): JSX.Element => (
  <StyledMainDiv>
    <StyledTopDiv>
      {title}
    </StyledTopDiv>
    <StyledBottonDiv>
      {text}
    </StyledBottonDiv>
    <StyledFooterDiv>
      {timeText}
    </StyledFooterDiv>
  </StyledMainDiv>
);

export default CardText;
