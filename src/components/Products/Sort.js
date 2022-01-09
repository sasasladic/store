import { useEffect } from "react";
import { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Sort = ({sort, setSort}) => {

  

  return <div>
    <FormControl>
      <InputLabel>Price</InputLabel>
      <Select>
        <MenuItem value='price'>[low - high]</MenuItem>
        <MenuItem value='-price'>[high - low]</MenuItem>
      </Select>
    </FormControl>
    <FormControl>
      <InputLabel>Time</InputLabel>
      <Select>
        <MenuItem value='oldest'>[old - new]</MenuItem>
        <MenuItem value='-oldest'>[new - old]</MenuItem>
      </Select>
    </FormControl>
  </div>
}


export default Sort;