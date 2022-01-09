import { useEffect } from "react";
import { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Filter = ({data, filter, set, i, great, gender}) => {

  let filterAlready = '';
  if (great[i]) {
    filterAlready = great[i].split('=')[1];
  }
  const startingState1 = filterAlready || filter;
  const [filterState, setFilterState] = useState(startingState1);
  const [options, setOptions] = useState(null);
  
  console.log(great);
  
  useEffect(() => {
    if (filterState !== filter) {
      let string;
      string = `&${filter}[]=${filterState}`;
      if (filter === 'categories') {
        string = '&filter[category]=' + filterState;
      }
  
      if (great[i] && great[i] == string ) {
        console.log('no update :)');
      } else {
        set(state => {
          const obj = { ...state }
          obj[i] = string;
          return obj;
        });
      }
    } else {
      if (great[i]) {
        set(state => {
          const obj = { ...state }
          delete obj[i]; 
          return obj;
        });
      }
    }
  }, [filterState]);

  useEffect(() => {
    const optionsTemp = [];
    if (filter === 'categories') {
      data.filters[filter].forEach(opt => {
        const color = opt.gender == 2 ? 'orange' : 'blue';
        if ((gender === 'Male' && opt.gender == 3) || (gender === 'Female' && opt.gender == 2)) {
          optionsTemp.push(<MenuItem style={{display: 'flex', justifyContent: 'space-between'}} key={opt.name} value={opt.name}>{opt.name} <span style={{fontWeight: 'bold', color: color}}>{opt.gender == 2 ? 'F' : 'M'}</span></MenuItem>)
        }
      })
      optionsTemp.push(<MenuItem style={{ display: 'flex', justifyContent: 'space-between' }} key={'special'} value={filter}><span style={{opacity: '0.6'}}>{filter}</span></MenuItem>)
    } else {
      data.filters[filter].forEach(opt => {
        optionsTemp.push(<MenuItem key={opt} value={opt}>{opt}</MenuItem>)
      });
      optionsTemp.push(<MenuItem style={{ display: 'flex', justifyContent: 'space-between' }} key={'special'} value={filter}><span style={{opacity: '0.6'}}>{filter}</span></MenuItem>)
    }
    setOptions(optionsTemp);
  }, [])

  const changeHandler = (e) => {
    setFilterState(e.target.value)
  }

  return <FormControl style={{margin: '0 10px'}}>
    <InputLabel>{filter}</InputLabel>
    <Select value={filterState} label={filter} onChange={changeHandler}>
      {options}
    </Select>
  </FormControl>
}

export default Filter