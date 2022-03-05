import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { setTokenInStorage, decodeToken } from '../../services/api';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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

  const handleSubmit = async () => {
    const data ={
      email,
      password
    }

    history.push("/app/dashboard");

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
            color="primary"
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
}