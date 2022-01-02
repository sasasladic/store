import RoomIcon from '@mui/icons-material/Room';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const ContactInfo = () => {
  return <div className='contactInfo'>
    <h3>Find us</h3>
    <p><RoomIcon/> Address</p>
    <a>Kralja Petra 1, Belgrade, Serbia</a>
    <p><MailOutlineIcon /> Email</p>
    <a href='mailto: test@allcafe.rs'>test@gmail.rs</a>
    <p><LocalPhoneIcon /> Phone</p>
    <a className='noMargin' href="tel:+381 666 666">+381 666 666</a>
    <a href='tel:+381 666 666'>+381 666 666</a>
  </div>
}

export default ContactInfo;