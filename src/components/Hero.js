import '../css/carousel.css';
import { Carousel } from "react-responsive-carousel";
import img1 from '../assets/image1.png'
import img2 from '../assets/image2.png'
import img3 from '../assets/image3.png'
import img4 from '../assets/image4.png'


const Hero = () => {

  return <section className='hero'>
    <div className="heroInner">
      <Carousel showArrows={true}>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
      </Carousel>
    </div>
  </section>
}

export default Hero;