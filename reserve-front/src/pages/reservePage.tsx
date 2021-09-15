import { Button, FormControl, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from 'styled-components';
import { RootReducerType } from '../state/store';

const StyledMainDiv = style.div`
  margin: 0px auto;
  width: 100%;
  height: 800px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;
`;
const StyledFontDiv = style.div`
  width: 100%;
  height: 100%;
  color: #494AE6;
  text-align: center;
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
            <Grid item xs={3}>
              <StyledFontDiv>출발일</StyledFontDiv>
            </Grid>
            <Grid item xs={9}>
              test
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <CustomField labelText="항공사" />
          <CustomField labelText="도착지" />
          <Grid container item xs={3}>
            <Grid item xs={3}>
              <StyledFontDiv>출발시간</StyledFontDiv>
            </Grid>
            <Grid item xs={9}>
              test
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{ margin: '10px 0px 0px 0px' }}
              className="ButtonStyle"
              variant="contained"
              color="primary"
            >
              조회하기
            </Button>
          </Grid>
        </Grid>
      </div>
    </StyledMainDiv>
  );
};

export default ReservePage;
