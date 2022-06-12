import React, { useState } from 'react';
import loginImg from '../../assets/login.jpeg';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
// import axios from 'axios';
import { setTokenInStorage, decodeToken, API, setIdInStorage, setUserDataInStorage } from '../../services/api';
import {Grid, Card, CardHeader, CardContent, Box} from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const LoginWrapper = styled('div')`
  min-height: 100vh;
  width: 100%;
  display: flex;
`

const LoginView = styled('div')`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background: url('${loginImg}') center center;
  background-size: 95%;
  background-repeat: no-repeat;
  background-color: #111423;
  width: 80%;
  @media(max-width: 980px){
    display: none;
  }
`;

const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 100px;
`;

const CustonTitle = styled(Typography)`
  font-weight: bold;
  line-height: inherit;
  span{
    font-size: 30px;
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }

    try {
      const user = await API.post("/login", data);
      setTokenInStorage('token');
      setIdInStorage(user.data["_id"]);
      setUserDataInStorage(user.data);

      history.push("/app/dashboard");

    } catch (error) {
      enqueueSnackbar('Não foi possível fazer login. Tente novamente.', {variant: "error"});
    }


    // axios.post(process.env.REACT_APP_API + '/token', data).then((response) => {
    //   dispatch({type: 'SET_TOKEN', token: response.data.token});
    //   dispatch({type: 'SET_DECODE', decode: decodeToken(response.data.token)});
    //   setTokenInStorage(response.data.token);
    // }).then(() => {
    //   history.push("/dashboard");
    // }).catch((e) => {
    //   enqueueSnackbar('Não foi possível fazer login. Tente novamente.', {variant: "error"});
    // });

  }

  return (
    <LoginWrapper>
      <LoginView></LoginView>
      <LoginContainer component="main" maxWidth="xs">
        <form className={classes.paper} onSubmit={(e) => handleSubmit(e)}>
          <CustonTitle>
            <span className="main-text">EDUCA</span>
            <span className="primary-text">LYTICS</span>
          </CustonTitle>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.submit}
            >
              Login
            </Button>
          </div>
        </form>
      </LoginContainer>
    </LoginWrapper>
    
  );
}