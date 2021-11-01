import {TextField, Button, Alert, AlertTitle} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";

import { authActions } from '../context/Context';
import { useDispatch } from "react-redux";

import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const LoginSigninForms = () => {

  const [isError, setIsError] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);
  const dispatch = useDispatch();
  
  const loginEmail = useRef();
  const loginPass = useRef();
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const pass = useRef();
  const passConfirm = useRef();


  //login event
  const handleLogin = () => {
    const userData = {
      email: loginEmail.current.value,
      password: loginPass.current.value
    };
    document.querySelector('.loginSpinner').classList.remove('hide');
    axios.post("https://api.orders.galeja.net/api/login", userData).then(res => {
      //success
      document.querySelector('.loginSpinner').classList.add('hide');
      localStorage.setItem('token', res.data.data.token);
      dispatch(authActions.login({ user: res.data.data }));
    }).catch(() => {
      //fail
      document.querySelector('.loginSpinner').classList.add('hide');
      setIsError('The given data was invalid');
    });
  }



  //signup event
  const handleSignup = () => {
    //getting user data
    const userData = {
      name: name.current.value,
      email: email.current.value,
      password: pass.current.value,
      password_confirmation: passConfirm.current.value
    }

    //validating data
    if (userData.name === '' || userData.email === '' || userData.password === '' || userData.password_confirmation === '' || surname.current.value === '') {
      setIsErrorRegister('You must fill all fields');    
    } else if (userData.password.length < 6) {
      setIsErrorRegister('Password must be at least 6 characters long');    
    } else if (userData.password !== userData.password_confirmation){
      setIsErrorRegister('Passwords must match');    
    } else {
      //success
      document.querySelector('.signupSpinner').classList.remove('hide');
      axios.post("https://api.orders.galeja.net/api/register", userData).then(res => {
        localStorage.setItem('token', res.data.data.token);
        document.querySelector('.signupSpinner').classList.add('hide');
        dispatch(authActions.login({ user: res.data.data }));
      }).catch(() => {
        //fail
        document.querySelector('.signupSpinner').classList.add('hide');
        setIsErrorRegister('The given data was invalid');    
      });
    }

  }

  return <div className="profileContainer">
  <div className='subheader'>
    <h1 className='subheaderInner'>Profile</h1>
  </div>
  <div className="profileInner">
    <div className="profile-login">
      <h3>Login</h3>
      <TextField inputRef={loginEmail} size='small' margin='normal' label='E-mail' type='outlined'></TextField>
      <TextField inputRef={loginPass} size='small' margin='normal' label='Password' type='password'></TextField>
      {isError ? 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          { isError }
        </Alert>
        : null
        }
        <Box className='loginSpinner hide' sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      <Button disableElevation onClick={ handleLogin } variant='contained' style={{alignSelf: "flex-end", marginTop: 20}}>Submit</Button>
    </div>
    <div className="profile-signup">
      <h3>Don't have account? Signup</h3>
      <TextField inputRef={name} size='small' margin='normal' label='Name' type='outlined'></TextField>
      <TextField inputRef={surname} size='small' margin='normal' label='Surname' type='outlined'></TextField>
      <TextField inputRef={email} size='small' margin='normal' label='E-mail' type='outlined'></TextField>
      <TextField type='password' inputRef={pass} size='small' margin='normal' label='Password' type='password'></TextField>
      <TextField type='password' inputRef={passConfirm} size='small' margin='normal' label='Confirm password' type='password'></TextField>
      {isErrorRegister ? 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          { isErrorRegister }
        </Alert>
        : null
        }
        <Box className='signupSpinner hide' sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      <Button disableElevation onClick={handleSignup} variant='contained' style={{ alignSelf: "flex-end", marginTop: 20}}>Submit</Button>
    </div>
  </div>
  </div>
}

export default LoginSigninForms