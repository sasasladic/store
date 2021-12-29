const SizePicker = ({curr, all, setVariant}) => {

  const color = curr.color;
  const sizes = [];
  const sizesDom = [];

  const handleSizeChange = (e) => {
    const size = e.target.id;
    all.forEach(variant => {
      if (variant.color === color && variant.size === size) {
        setVariant(variant);
      }
    });
  }

  all.forEach(variant => {
    if (variant.color === color) {
      sizes.push(variant.size);
    }
  })
  sizes.forEach(size => {
    sizesDom.push(<div onClick={handleSizeChange} id={size} key={size} className={size === curr.size ? 'active sizeItem' : 'sizeItem'}>{size}</div>)
  })

  return <div className="sizePicker">
    <p className="label">Select size</p>
    <div className="sizeContainer">
      {sizesDom}
    </div>
  </div>
}

export default SizePicker;