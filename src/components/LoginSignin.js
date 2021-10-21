import LoginSigninForms from "./LoginSigninForms";

import { Button } from '@mui/material'

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../context/Context";

const LoginSignin = () => {

  const {isLoggedIn, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log('user', user);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.clear();
  }

  return <div>
    {isLoggedIn ? 
      <div>
        <div className='' >
          <div className='subheader' >
            <h1 className='subheaderInner'>Profile</h1>
          </div>
          <div style={{maxWidth: 1200, margin: '0 auto'}}>
            <h1 style={{padding: 20}}>You are logged in as {user.name}</h1>
            <span style={{opacity: 0.5, padding: 20}}>Want to change account?</span>
            <Button onClick={logoutHandler} variant='outlined'>Log out</Button>
          </div>
        </div>
      </div>
      :
      <LoginSigninForms />
  }
  </div>
}

export default LoginSignin;