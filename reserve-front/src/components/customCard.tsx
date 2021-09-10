import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import FlightOutlinedIcon from '@material-ui/icons/FlightOutlined';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

import CardText from './cardText';

const width = '360px';
const height = '130px';
const IconStyleObject = {
  color: '#fff',
  width: '100%',
  height,
};

interface Props {
  title: string;
  text: string;
  timeText: string;
  icon: string;
  color: string;
}

const renderIcon = (name: string) => {
  switch (name) {
    case 'FlightTakeoff':
      return (
        <FlightTakeoffIcon
          style={IconStyleObject}
        />
      );
    default:
      return (
        <FlightOutlinedIcon
          style={IconStyleObject}
        />
      );
  }
};

const CustomCard: React.FC<Props> = ({
  title, text, timeText, icon, color,
}): JSX.Element => (
  <div
    style={{
      width,
      height,
      backgroundColor: color === undefined ? '#35B2E8' : color,
    }}
  >
    <Grid
      container
      style={{
        height: '100%',
      }}
    >
      <Grid
        item
        xs={8}
        style={{
          height: '100%',
        }}
      >
        <CardText
          title={title}
          text={text}
          timeText={timeText}
        />
      </Grid>
      <Grid
        item
        xs={4}
      >
        {renderIcon(icon)}
      </Grid>
    </Grid>
  </div>
);

export default CustomCard;
