import '../css/carousel.css';
import { Carousel } from "react-responsive-carousel";

const Hero = () => {

  return <section className='hero'>
    <div className="heroInner">
      <Carousel showArrows={true}>
        <div>
          <img src={`${process.env.PUBLIC_URL + '/img/image1.png'}`} />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL + '/img/image2.png'}`}  />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL + '/img/image3.png'}`}  />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL + '/img/image4.png'}`}  />
        </div>
      </Carousel>
    </div>
  </section>
}

export default Hero;