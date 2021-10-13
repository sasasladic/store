const Hero = () => {

  return <section className='hero' style={{ 
    backgroundImage: `url(${process.env.PUBLIC_URL + '/img/hero.png'})`,
    backgroundRepeat: 'no-repeat',
  }}>
    <div className="heroInner">
      {/* <h1>Poručite vašu <span>Kraljicu</span></h1>
      <h1>na kućnu adresu.</h1>
      <button className='btn big'>POGLEDAJTE PROIZVODE</button> */}
    </div>
  </section>
}

export default Hero;