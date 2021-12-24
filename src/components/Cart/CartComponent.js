import { Fragment } from "react";
import { useState } from "react";
import { Box, Stepper, Step, Button, StepLabel } from "@mui/material";
import { useSelector } from "react-redux";
import ProductConfirm from "./ProductConfirm";
import BuyersInformation from "./BuyersInformation";
import Payment from "./Payment";
import Confirmation from "./Confirmation";

const steps = ['Potvrda proizvoda', 'Vaše informacije', 'Plaćanje', 'Potvrda'];
const stepsComponents = [<ProductConfirm />, <BuyersInformation />, <Payment />, <Confirmation />];

const CartComponent = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const cart = useSelector(state => state.cart.cartLength);

  const handleNext = () => {
    let newSkipped = skipped;
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
      <h3 className="subheaderInner">Korpa</h3>
    </div>
    <div className='cartInner'>
      <div className="stepper">
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
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
                  Nazad
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button disabled={!cart ? true : false} variant='contained' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Završi' : 'Nastavi'}
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