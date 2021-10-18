import {TextField, Button, Alert, AlertTitle} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";

const LoginSignin = () => {

  const [isError, setIsError] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);


  const handleLogin = () => {
    const userData = {
      email: loginEmail.current.value,
      password: loginPass.current.value
    };

    axios.post("https://api.orders.galeja.net/api/login", userData).then(res => {
      console.log('user', res);
    }).catch(err => {
      setIsError('The given data was invalid');
    });
  }

  const handleSignup = () => {
    const userData = {
      name: name.current.value,
      email: email.current.value,
      password: pass.current.value,
      password_confirmation: passConfirm.current.value
    }

    axios.post("https://api.orders.galeja.net/api/register", userData).then(res => {
      console.log(res);
    }).catch(err => {
      setIsErrorRegister('The given data was invalid');    
    });
  }

  const loginEmail = useRef();
  const loginPass = useRef();
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const pass = useRef();
  const passConfirm = useRef();




  return <div className="profileContainer header-separator">
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
        <Button disableElevation onClick={handleSignup} variant='contained' style={{ alignSelf: "flex-end", marginTop: 20}}>Submit</Button>
      </div>
    </div>
  </div>
}

export default LoginSignin;