import axios from "axios";
import { useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, TableContainer } from "@mui/material";
import { useState } from "react";

const ProfileData = () => {

  const [dom, setDom] = useState([]);

  useEffect(() => {
    const head = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get('https://api.orders.galeja.net/api/order', head).then(res => {
      const data = res.data.data;
      const domTemp = [];
      data.forEach((item, i) => {
        const statusColor = item.status === 'ordered' ? 'green' : 'orange';
        domTemp.push(<TableRow key={i}>
          <TableCell>{item.sum}€</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{item.ordered_at}</TableCell>
          <TableCell>{item.address}</TableCell>
          <TableCell style={{ color: statusColor }}>{item.status}</TableCell>
        </TableRow>);
      })
      setDom(domTemp);

    }).catch(err => {
      console.log(err);
    });
  }, [])

  return <div className="profileData">
    <div className="profileDataInner">
      <h3 style={{ opacity: 0.6, fontWeight: 'normal', marginLeft: 20 }}>Profile order history</h3>
      {dom.length ? 
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>Price</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Items</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Date</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Address</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              { dom }
          </TableBody>
        </Table>
        </TableContainer>  
        : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress></CircularProgress></div>}
    </div>
  </div>
}

export default ProfileData;