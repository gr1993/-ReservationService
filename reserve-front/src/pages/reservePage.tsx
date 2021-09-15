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
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from 'styled-components';
import { RootReducerType } from '../state/store';

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
}

const CustomField: React.FC<CustomFieldProps> = ({ labelText }): JSX.Element => {
  const classes = useStyles();

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
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ReservePage = (): JSX.Element => {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  useEffect(() => {
    // if (!memberReducer.accessToken) {
    //   alert('로그인 후 이용이 가능합니다.');
    //   history.push('/login');
    //   return;
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledMainDiv>
      <div>
        <Grid container style={{ margin: '10px 0px 0px 0px' }}>
          <CustomField labelText="인원" />
          <CustomField labelText="출발지" />
          <Grid container item xs={3}>
            <Grid item xs={4}>
              <StyledFontDiv>출발일</StyledFontDiv>
            </Grid>
            <Grid item xs={8}>
              <TextField
                style={{ margin: '10px 0px 0px 15px', width: '135px' }}
                id="date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <CustomField labelText="항공사" />
          <CustomField labelText="도착지" />
          <Grid container item xs={3}>
            <Grid item xs={4}>
              <StyledFontDiv>출발시간</StyledFontDiv>
            </Grid>
            <Grid item xs={8}>
              <TextField
                style={{ margin: '10px 0px 0px 15px', width: '135px' }}
                id="time"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{ margin: '10px 0px 0px 20px' }}
              className="ButtonStyle"
              variant="contained"
              color="primary"
            >
              조회하기
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: '15px', height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
        <Button
          style={{ margin: '10px 15px 0px 0px', float: 'right', width: '150px', height: '60px' }}
          className="ButtonStyle"
          variant="contained"
          color="secondary"
        >
          예약하기
        </Button>
      </div>
    </StyledMainDiv>
  );
};

export default ReservePage;
