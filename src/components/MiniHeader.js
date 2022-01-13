import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color : 'green'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },

});


const MiniHeader = () => {

  const cartLength = useSelector(state => state.cart.cartLength);

  const searchRef = useRef();
  const history = useHistory();

  const searchHandler = () => {
    if (searchRef.current.value !== '') {
      history.push(`/search/${searchRef.current.value}`);
    }
  }

  const textHandler = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      searchHandler();
    }
  }

  return <div className='miniHeader'>
    <div className="miniHeaderInner">
      <div className="left">
        <Link to='/profile'>
          <div className='miniHeader-profile-container'>
            <Button variant='outlined' style={{color: 'white', borderColor: 'white'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
              <span>Profile</span>
            </Button>
          </div>
        </Link>
        <Link to='/cart'>
          <div className='miniHeader-cart-container'>
            <Button variant='outlined' style={{color: 'white', borderColor: 'white'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              Cart
              <span style={{marginLeft: 10}}> ({cartLength})</span>
            </Button>
          </div>
        </Link>
      </div>
      <div className="right">
        <TextField InputLabelProps={{root:{color: 'white'}}} color='primary' className='searchField' sx={{ input: { color: 'whitesmoke' } }} label='Search' inputRef={searchRef} size='small' InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon onClick={searchHandler} style={{ color: 'whitesmoke' }}></SearchIcon></InputAdornment>), classes: {root: {borderColor: 'white'}} }} onKeyDown={textHandler}></TextField>
      </div>
    </div>
  </div>
}

export default MiniHeader;