import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface Props {
  seq: number;
  open: boolean;
  onClickEvent: () => void;
}

const SimpleModal: React.FC<Props> = ({ seq, open, onClickEvent }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <span style={{ fontSize: '0.6em' }}>
          <b>[닫기]</b> 버튼을 누르면 <span style={{ color: 'red' }}>대기번호</span>가 다시
          부여됩니다.
        </span>
        <Button
          style={{ float: 'right' }}
          className="ButtonStyle"
          variant="contained"
          color="default"
          onClick={onClickEvent}
        >
          닫기
        </Button>
      </div>
      <div style={{ fontSize: '0.6em' }}>
        <b>[닫기]</b> 버튼은 대기자 수가 줄지 않는 경우에만 사용하세요.
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.8em' }}>
        <b>접속 대기 안내</b>
      </div>
      <div
        style={{
          backgroundColor: '#494AE6',
          textAlign: 'center',
          height: '40px',
          lineHeight: '40px',
        }}
      >
        <span style={{ color: 'white', fontSize: '0.9em' }}>
          현재 <b style={{ color: 'yellow' }}>{seq}</b>번째로 접속대기 중이며, 순서에 따라 자동
          접속됩니다.
        </span>
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.8em' }}>
        <b>시간 제한 안내</b>
      </div>
      <div
        style={{
          backgroundColor: '#35B2E8',
          textAlign: 'center',
          height: '40px',
          lineHeight: '40px',
        }}
      >
        <span style={{ color: 'white', fontSize: '0.9em' }}>
          예약시간은 <b style={{ color: 'yellow' }}>30초</b>까지입니다.
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default SimpleModal;
