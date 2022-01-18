import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Sort = ({sort, setSort}) => {

  const changeHandler = (e) => {
    setSort(e.target.value);
  }

  return <div>
    <FormControl style={{marginTop: 10}}>
      <InputLabel>Sort</InputLabel>
      <Select value={sort} onChange={changeHandler} label='sort'>
        <MenuItem value='price'>Price [low - high]</MenuItem>
        <MenuItem value='-price'>Price [high - low]</MenuItem>
        <MenuItem value='oldest'>Oldest</MenuItem>
        <MenuItem value='-oldest'>Newest</MenuItem>
        <MenuItem value='sort' style={{opacity: 0.5}}>Sort</MenuItem>
      </Select>
    </FormControl>
  </div>
}


export default Sort;