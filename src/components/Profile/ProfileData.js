import axios from "axios";
import { useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, TableContainer, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

const ProfileData = () => {

  const [dom, setDom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('last_updated')

  const sortHandler = (e) => {
    setSort(e.target.value);
  }

  useEffect(() => {
    const head = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    const url = sort ? `https://api.orders.galeja.net/api/order?sort=${sort}`  : 'https://api.orders.galeja.net/api/order';
    setLoading(true);
    axios.get(url, head).then(res => {
      const data = res.data.data;
      const domTemp = [];
      data.forEach((item, i) => {
        const statusColor = item.status === 'ordered' ? 'green' : 'orange';
        domTemp.push(<TableRow key={i}>
          <TableCell>{item.sum}€</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{item.ordered_at.substring(0, 10)}</TableCell>
          <TableCell>{item.address}</TableCell>
          <TableCell style={{ color: statusColor }}>{item.status}</TableCell>
        </TableRow>);
      })
      setDom(domTemp);
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      console.log(err);
    });
  }, [sort])

  return <div className="profileData">
    <div className="profileDataInner">
      <h3 style={{ opacity: 0.6, fontWeight: 'normal', marginLeft: 20 }}>Profile order history</h3>
      <FormControl>
        <InputLabel id='label123'>Sort</InputLabel>
        <Select value={sort} onChange={sortHandler} labelId="123" label='Sort'>
          <MenuItem value='last_updated'>Last updated (newest)</MenuItem>
          <MenuItem value='-last_updated'>Last updated (oldest)</MenuItem>
          <MenuItem value='-sum'>Price (high)</MenuItem>
          <MenuItem value='sum'>Price (low)</MenuItem>
        </Select>
      </FormControl>
      {!loading ? 
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>Price</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Items</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Order Date</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Address</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              { dom }
          </TableBody>
        </Table>
        </TableContainer>  
        : <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}><CircularProgress></CircularProgress></div>}
    </div>
  </div>
}

export default ProfileData;