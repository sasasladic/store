import { Fragment } from "react";
import { useState } from "react";
import { Box, Stepper, Step, Button, StepLabel } from "@mui/material";
import { useSelector } from "react-redux";
import ProductConfirm from "./ProductConfirm";
import BuyersInformation from "./BuyersInformation";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import { useHistory } from "react-router-dom";

const steps = ['Product confirm', 'Your informations', 'Payment', 'Confirmation'];

const CartComponent = () => {
  
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const cart = useSelector(state => state.cart.cartLength);
  const user = useSelector(state => state.auth)
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('onDelivery');
  
  let nextIsDisabled = false;
  if (activeStep === 0 && !cart) { nextIsDisabled = true; }
  if (activeStep == 1 && !address) { nextIsDisabled = true;}

  
  const stepsComponents = [<ProductConfirm />, <BuyersInformation addressInfo={address} setAddressInfo={setAddress} />, <Payment value={paymentMethod} setValue={setPaymentMethod} />, <Confirmation address={address} />];


  const handleNext = () => {
    let newSkipped = skipped;
    if (activeStep === 3) {
      history.push('/')
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return <div className='cart'>
    <div className="subheader">
      <h1 className="subheaderInner">Cart</h1>
    </div>
    <div className='cartInner'>
      <div className="stepper">
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel className='stepLabel' {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {stepsComponents[activeStep]}
          </div>
          {activeStep === steps.length ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          ) : (
            <Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant='outlined'                    
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button disabled={nextIsDisabled} variant='contained' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Back to Shop' : 'Continue'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </div>
    </div>
  </div>
}

export default CartComponent;