import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from 'styled-components';
import dateformat from 'dateformat';
import { RootReducerType } from '../state/store';
import {
  getTicketAirline,
  getTicketAirport,
  getTicketData,
  reserveTicket,
} from '../state/actions/ticketAction';

const StyledTimeDiv = style.div`
  position: absolute;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #42eff5;
  color: black;
  border: 3px solid rgba(190, 190, 190, .5);
  border-radius: 10px;
  text-align: center;
  font-size: 25px;
  left:50%; 
  transform:translateX(-50%);
`;
const StyledMenuDiv = style.div`
  font-size: 2.0em;
  margin-bottom: 50px;
`;
const StyledMainDiv = style.div`
  margin: 0px auto;
  width: 100%;
  height: 620px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;
`;
const StyledFontDiv = style.div`
  width: 100%;
  height: 100%;
  color: #494AE6;
  text-align: right;
  line-height: 55px;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    height: 40,
  },
}));

interface CustomFieldProps {
  labelText: string;
  dataList: {
    value: string;
    display: string;
  }[];
  onChangeAfter: (value: string) => void;
}

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

const dumpRowDatas = [
  {
    id: '1',
    airline: '대한항공',
    start_airport: '인천공항',
    end_airport: '프랑스공항',
    start_date: '2021-09-20',
    start_time: '09:00',
    end_time: '15:00',
    price: '1,152,000',
    rest: '7/15',
  },
];

const emptyState = [
  {
    display: 'None',
    value: '',
  },
];

const memberCountData = [
  {
    display: 'None',
    value: '',
  },
  {
    display: '1명',
    value: '1',
  },
  {
    display: '2명',
    value: '2',
  },
  {
    display: '3명',
    value: '3',
  },
  {
    display: '4명',
    value: '4',
  },
  {
    display: '5명',
    value: '5',
  },
];

const CustomField: React.FC<CustomFieldProps> = ({
  labelText,
  dataList,
  onChangeAfter,
}): JSX.Element => {
  const classes = useStyles();
  const [value, setvalue] = React.useState('');

  const handleChange = (event: any) => {
    const data = event.target.value;
    setvalue(data);
    onChangeAfter(data);
  };

  return (
    <Grid container item xs={3}>
      <Grid item xs={3}>
        <StyledFontDiv>{labelText}</StyledFontDiv>
      </Grid>
      <Grid item xs={9}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            className={classes.selectEmpty}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={handleChange}
          >
            {dataList.map((d) => {
              return (
                <MenuItem key={d.value} value={d.value}>
                  {d.display}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const ReservePage = (): JSX.Element => {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  const [airlineData, setAirlineData] = useState(emptyState);
  const [startAirportData, setStartAirportData] = useState(emptyState);
  const [endAirportData, setEndAirportData] = useState(emptyState);

  const [memberCount, setMemberCount] = useState('');
  const [airline, setAirline] = useState('');
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const [startDate, setStartDate] = useState('2021-09-20');
  const [startTime, setStartTime] = useState('09:00');
  const [time, setTime] = useState(30);
  const [timeText, setTimeText] = useState('00:00');

  const [ticketData, setTicketData] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  const getAirlineData = async () => {
    const response = await getTicketAirline();

    if (response.success) {
      const data = response.data.map((d) => {
        return {
          display: d.title,
          value: d.code,
        };
      });
      setAirlineData([
        {
          display: 'None',
          value: '',
        },
        ...data,
      ]);
    }
  };
  const getStartAirportData = async () => {
    const response = await getTicketAirport('start_airport');

    if (response.success) {
      const data = response.data.map((d) => {
        return {
          display: d.start_airport,
          value: d.start_airport,
        };
      });
      setStartAirportData([
        {
          display: 'None',
          value: '',
        },
        ...data,
      ]);
    }
  };
  const getEndAirportData = async () => {
    const response = await getTicketAirport('end_airport');

    if (response.success) {
      const data = response.data.map((d) => {
        return {
          display: d.end_airport,
          value: d.end_airport,
        };
      });
      setEndAirportData([
        {
          display: 'None',
          value: '',
        },
        ...data,
      ]);
    }
  };
  const calTime = (preTime: number) => {
    if (preTime === 0) {
      history.push('/');
      return;
    }

    const nextTime = preTime - 1;

    setTime(nextTime);
    if (nextTime >= 10) {
      setTimeText(`00:${nextTime.toString()}`);
    } else {
      setTimeText(`00:0${nextTime.toString()}`);
    }
    setTimeout(() => {
      calTime(nextTime);
    }, 1000);
  };

  useEffect(() => {
    if (!memberReducer.accessToken) {
      alert('로그인 후 이용이 가능합니다.');
      history.push('/login');
      return;
    }

    setTimeout(() => {
      calTime(time);
    }, 1000);

    getAirlineData();
    getStartAirportData();
    getEndAirportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeMemberCount = (value: string) => {
    setMemberCount(value);
  };
  const onChangeAirline = (value: string) => {
    setAirline(value);
  };
  const onChangeStartAirport = (value: string) => {
    setStartAirport(value);
  };
  const onChangeEndAirport = (value: string) => {
    setEndAirport(value);
  };
  const onChangeStartDate = (event: any) => {
    setStartDate(event.target.value);
  };
  const onChangeStartTime = (event: any) => {
    setStartTime(event.target.value);
  };
  const onSelectionModelChange = (selectionModel: any) => {
    setSelectedTickets(selectionModel);
  };

  const searchTicket = async () => {
    if (!memberCount) {
      alert('인원을 입력하세요.');
      return;
    }
    if (!startDate) {
      alert('출발일을 입력하세요.');
      return;
    }
    if (!startTime) {
      alert('출발시간을 입력하세요.');
      return;
    }

    const [year, month, day] = startDate.split('-');
    const [hour, minute] = startTime.split(':');

    const codes = await getTicketAirline();
    const response = await getTicketData({
      memberCount: Number(memberCount),
      airline,
      startAirport,
      endAirport,
      startDate: new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
      ),
    });

    if (codes.success && response.success) {
      const data = response.data.map((d: any) => {
        const airlineName = codes.data.find((f) => f.code === d.airline)?.title;
        const startDateString = dateformat(d.start_date, 'yyyy-mm-dd');
        const startTimeString = dateformat(d.start_date, 'hh:MM');
        let endDate = new Date(d.start_date).getTime();
        endDate += d.duration_time * 60 * 60 * 1000;
        const emdTimeString = dateformat(new Date(endDate), 'hh:MM');
        const priceString = d.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const restString = `${d.rest}/${d.count}`;

        return {
          id: d.srl,
          airline: airlineName,
          start_airport: d.start_airport,
          end_airport: d.end_airport,
          start_date: startDateString,
          start_time: startTimeString,
          end_time: emdTimeString,
          price: priceString,
          rest: restString,
        };
      });
      setTicketData(data);
    }
  };

  const reserveTicketAction = async () => {
    if (!memberCount) {
      alert('인원을 입력하세요.');
      return;
    }
    if (selectedTickets.length === 0) {
      alert('예약할 항공권 선택하세요');
      return;
    }
    if (!memberReducer.accessToken) {
      alert('로그인 후 이용이 가능합니다.');
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    if (confirm('선택된 항공권을 예약하시겠습니까?')) {
      const response = await reserveTicket(memberReducer.accessToken, {
        ticketSrls: selectedTickets,
        count: Number(memberCount),
      });

      alert(response.msg);
      searchTicket();
    }
  };

  return (
    <div>
      <StyledTimeDiv>{timeText}</StyledTimeDiv>
      <StyledMenuDiv>
        <b>예약하기(항공권)</b>
      </StyledMenuDiv>
      <StyledMainDiv>
        <div>
          <Grid container style={{ margin: '10px 0px 0px 0px' }}>
            <CustomField
              labelText="인원"
              dataList={memberCountData}
              onChangeAfter={onChangeMemberCount}
            />
            <CustomField
              labelText="출발지"
              dataList={startAirportData}
              onChangeAfter={onChangeStartAirport}
            />
            <Grid container item xs={3}>
              <Grid item xs={4}>
                <StyledFontDiv>출발일</StyledFontDiv>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={{ margin: '10px 0px 0px 15px', width: '140px' }}
                  id="date"
                  type="date"
                  defaultValue={startDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChangeStartDate}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <CustomField
              labelText="항공사"
              dataList={airlineData}
              onChangeAfter={onChangeAirline}
            />
            <CustomField
              labelText="도착지"
              dataList={endAirportData}
              onChangeAfter={onChangeEndAirport}
            />
            <Grid container item xs={3}>
              <Grid item xs={4}>
                <StyledFontDiv>출발시간</StyledFontDiv>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={{ margin: '10px 0px 0px 15px', width: '140px' }}
                  id="time"
                  type="time"
                  defaultValue={startTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={onChangeStartTime}
                />
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Button
                style={{ margin: '10px 0px 0px 20px' }}
                className="ButtonStyle"
                variant="contained"
                color="primary"
                onClick={searchTicket}
              >
                조회하기
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: '15px', height: 400, width: '100%' }}>
            <DataGrid
              rows={ticketData}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              disableColumnMenu
              onSelectionModelChange={onSelectionModelChange}
            />
          </div>
          <Button
            style={{ margin: '10px 15px 0px 0px', float: 'right', width: '150px', height: '60px' }}
            className="ButtonStyle"
            variant="contained"
            color="secondary"
            onClick={reserveTicketAction}
          >
            예약하기
          </Button>
        </div>
      </StyledMainDiv>
    </div>
  );
};

export default ReservePage;
