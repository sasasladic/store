import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, } from "@mui/material"

const Payment = ({ value, setValue}) => {
  
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return <div className="payment">
    <h2>Payment</h2>
    <div className="inputContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">Select your payment method</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value="onDelivery" control={<Radio />} label="On delivery" />
          <FormControlLabel value="card" control={<Radio disabled />} label="Card" />
        </RadioGroup>
      </FormControl>
    </div>
  </div>
}

export default Payment;