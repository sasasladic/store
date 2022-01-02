import ContactInfo from "./ContactInfo"
import Message from "./Message"

const ContactContainer = () => {
  return <div className="contact">
    <div className="description">
      <h1>CONTACT</h1>
    </div>
    <div className='contactInner'>
      <ContactInfo/>
      <Message/>
    </div>
  </div>
}

export default ContactContainer;