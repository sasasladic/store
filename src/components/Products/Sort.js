import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Sort = ({sort, setSort}) => {

  const changeHandler = (e) => {
    setSort(e.target.value);
  }

  return <div>
    <FormControl>
      <InputLabel>Sort</InputLabel>
      <Select value={sort} onChange={changeHandler} label='sort'>
        <MenuItem value='price'>[low - high]</MenuItem>
        <MenuItem value='-price'>[high - low]</MenuItem>
        <MenuItem value='oldest'>[old - new]</MenuItem>
        <MenuItem value='-oldest'>[new - old]</MenuItem>
        <MenuItem value='sort' style={{opacity: 0.5}}>Sort</MenuItem>
      </Select>
    </FormControl>
  </div>
}


export default Sort;