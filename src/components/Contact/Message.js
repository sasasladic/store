import { TextField, Button, CircularProgress, Alert, AlertTitle } from "@mui/material";
import { useRef, useState } from "react";
import axios from 'axios';

const Message = () => {

  const messageRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);

  const sendHandler = () => {
    const body = {
      email: emailRef.current.value,
      message: messageRef.current.value,
      subject: nameRef.current.value
    }

    setLoading(true);
    axios.post('https://api.orders.galeja.net/api/contact', body).then(res => {
      setLoading(false);
      setState({succ: true, mess: "Your message has been sent successfully!"})
    }).catch(err => {
      setLoading(false);
      setState({succ: false, mess: err.response.data.message})
    })
  }

  return <div className='message'>
    <h3>Send us a message</h3>
    <TextField inputRef={nameRef} className='input' label="Your name (optional)" variant="outlined" />
    <TextField inputRef={emailRef} className='input' label="Your email" variant="outlined" />
    <TextField disabled={loading} inputRef={messageRef} className='input' maxRows='5' label="Your message" multiline variant="outlined" />
    { loading ? <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress></CircularProgress></div> : null}
    <Button onClick={sendHandler} variant='contained'>Send</Button>
    {state && state.succ === true ? <Alert style={{marginTop: 20}} severity="success"><AlertTitle>Success</AlertTitle> {state.mess}</Alert> : null}
    {state && state.succ === false ? <Alert style={{marginTop: 20}} severity="error"><AlertTitle>Error</AlertTitle> {state.mess}</Alert> : null}
  </div>
}

export default Message;