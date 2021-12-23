import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const FiltersComponent = ({ sortPrice, setSortPrice }) => { 

  const handleSortChange = (e) => { 
    setSortPrice(e.target.value);
  }

  return <div className="filters">
    <div className="filtersInner">
    <FormControl className='sortSelect' sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="price-sort-label">Sort</InputLabel>
      <Select size="small" placeholder="Sort" value={sortPrice} label="Sort" labelId="price-sort-label" onChange={handleSortChange}>
        <MenuItem value={'fromTop'}>Price [ high - low ]</MenuItem>
        <MenuItem value={'fromBottom'}>Price [ low - high ]</MenuItem>
      </Select>
    </FormControl>
    </div>
  </div>
}

export default FiltersComponent;