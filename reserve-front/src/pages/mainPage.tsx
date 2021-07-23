import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 500px;
  background-image:url('img/plane-4301615_1280.png');
  background-size:cover;
  background-repeat:no-repeat;
`;

function MainPage(): JSX.Element {
  return (
    <StyledDiv />
  );
}

export default MainPage;
