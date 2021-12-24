import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useState } from 'react';
import { TableContainer, Table, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import {authActions} from '../../context/Context'

const BuyersInformation = () => {

  const userStore = useSelector(state => state.auth.userStore);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // todo: Display form for guest user if isGuest is true
  const [isGuest, setIsGuest] = useState(false);

  function createData(name, value) {
    return { name, value };
  }

  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('hello');
    dispatch(authActions.logout());
  }

  const rows = [
    createData('Ime', userStore.name),
    createData('Prezime', userStore.surname),
    createData('E-mail', userStore.email),
    createData('Broj telefona', userStore.phone),
    createData('Adresa i broj', userStore.adress),
    createData('Grad', userStore.city),
    createData('Poštanski broj', userStore.zip),
    createData('Godina rođenja', userStore.year)
  ];

  return <div className='buyersInfo'>
    {isLoggedIn ? 
      <Fragment>
        <h2>Vaše informacije</h2>
        <TableContainer style={{maxWidth: 700, margin: '0 auto'}} component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='logoutContainer'>
          <span className='label'>Date informacije ne odgovaraju vašim informacijama? </span>
          <Button onClick={logoutHandler} disableElevation size='small' variant='contained' color='error'>Izloguj se</Button>
        </div>
        
      </Fragment>
      :
      <Fragment>
        <h2>Vaše informacije</h2>
        <p className='miniLabel'>Opcija 1</p>
        <div className="guestButtonContainer"><Button variant='contained' color='success' className='guestButton'>Nastavite kao gost</Button></div>
        <p className='miniLabel'>Opcija 2</p>
        {/* <LoginSignin/> */}
      </Fragment>  
    }
  </div>
}

export default BuyersInformation;