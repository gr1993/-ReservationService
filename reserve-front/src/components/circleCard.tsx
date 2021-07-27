import React from 'react';
import styled from 'styled-components';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import ImportantDevicesTwoToneIcon from '@material-ui/icons/ImportantDevicesTwoTone';

const width = 120;
const height = 120;

const StyledMainDiv = styled.div`
  width: ${width}px;
  height: ${height + 50}px;
  text-align: center;
  font-size: 12px;
  display: inline-block;
  margin: 0px 67px;
`;

const StyledIconDiv = styled.div`
  width: calc(${width}px - 40px);
  height: calc(${height}px - 40px);
  padding: 20px;
  background-color: #fff;
  border-radius: 50%;

  .iconStyle {
    width: 100%;
    height: 100%;
  }
`;
const StyledTextDiv = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const renderIcon = (name: string) => {
  switch (name) {
    case 'reservation':
      return (
        <ListAltTwoToneIcon className="iconStyle" />
      );
    case 'time':
      return (
        <QueryBuilderTwoToneIcon className="iconStyle" />
      );
    case 'rest':
      return (
        <ImportantDevicesTwoToneIcon className="iconStyle" />
      );
    default:
      return (
        <NotificationsActiveTwoToneIcon className="iconStyle" />
      );
  }
};

interface Props {
  icon: string,
  text: string,
}

const CircleCard: React.FC<Props> = ({ icon, text }): JSX.Element => (
  <StyledMainDiv>
    <StyledIconDiv>
      {renderIcon(icon)}
    </StyledIconDiv>
    추석항공권
    <br />
    <StyledTextDiv>
      {text}
    </StyledTextDiv>
  </StyledMainDiv>
);

export default CircleCard;
