import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useState, useRef } from 'react';
import { TextField, Button, Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import {authActions} from '../../context/Context'
import axios from 'axios';
import { Link } from 'react-router-dom';


const BuyersInformation = ({ addressInfo, setAddressInfo}) => {

  const userStore = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const loginEmail = useRef();
  const loginPass = useRef();
  const [isError, setIsError] = useState(false);
  const [isAddressErr, setIsAddressErr] = useState(true);
  
  // buyers address 
  const country = useRef();
  const city = useRef();
  const address = useRef();

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

  const typingHandler = () => {
    if (!address.current.value || !city.current.value || !country.current.value) {
      setIsAddressErr(true);
      setAddressInfo('');
    } else {
      setIsAddressErr(false);
      const fullAddress = address.current.value + ', ' + city.current.value + ', ' + country.current.value;
      setAddressInfo(fullAddress);
      console.log(fullAddress);
    }
  }

  // const addressConfirmHandler = () => {
    
  // }

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  }


  return <div className='buyersInfo'>
    {isLoggedIn ? 
      <Fragment>
        <h2>Your informations</h2>
        <div style={{maxWidth: 1200, margin: '50px auto'}}>
          <div className='inputContainer'>
            <h3>Delivery location</h3>
            <div style={{display: 'flex', alignItems: 'center', margin: '10px 0', justifyContent: 'space-between'}}>
              <TextField onChange={typingHandler} inputRef={country} style={{width: '100%'}} label="Country" variant="outlined" size='small' />
            </div>
            <div style={{display: 'flex', alignItems: 'center', margin: '10px 0', justifyContent: 'space-between'}}>
              <TextField onChange={typingHandler} inputRef={city} style={{width: '100%'}} label="City" variant="outlined" size='small' />
            </div>
            <div style={{display: 'flex', alignItems: 'center', margin: '10px 0', justifyContent: 'space-between'}}>
              <TextField onChange={typingHandler} inputRef={address} style={{width: '100%'}} label="Address" variant="outlined" size='small' />
            </div>
            {isAddressErr ?
              <Alert severity='warning'>All fields must be filled</Alert>  
              :
              <Alert severity='success'>Address added successfully</Alert>
            }
          </div>
          <div style={{marginTop: 50}}>
            <span style={{opacity: 0.5, padding: 20}}>Want to change account?</span>
            <Button onClick={logoutHandler} variant='outlined'>Log out</Button>
          </div>
          
        </div>  
      </Fragment>
      :
      <Fragment>
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
          <Alert severity='warning'>You must log in to continue</Alert>
          <span style={{opacity: '.6', marginTop: '10px'}}>Don't have account? <Link style={{color: 'blue', textDecoration: 'underline'}} to='/profile'>Register now</Link></span>
          <Button disableElevation onClick={ handleLogin } variant='contained' style={{alignSelf: "flex-end", marginTop: 20}}>Submit</Button>
        </div>
      </Fragment>  
    }
  </div>
}

export default BuyersInformation;