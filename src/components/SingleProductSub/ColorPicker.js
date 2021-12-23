const ColorPicker = ({curr, all, setVariant}) => { 

  const colors = [];
  const colorsDom = [];
  
  
  const handleColorChange = (e) => {
    const color = e.target.id;
    all.forEach(variant => {
      if (variant.color === color && variant.size === curr.size) {
        setVariant(variant)
      }
    });
  }


  all.forEach(variant => { 
    if (!colors.includes(variant.color)) { 
      colors.push(variant.color);
    }
  })
  colors.forEach(col => {
    const lowercase = col.toLowerCase();
    colorsDom.push(<div id={col} onClick={handleColorChange} key={col} className={curr.color === col ? 'colorItem active' : 'colorItem'} style={{ backgroundColor: lowercase }}></div>);
  })


  return <div className="colorPicker">
    <p className="label">{colors.length} {colors.length === 1 ? 'color' : 'colors'} available</p>
    <div className="colorContainer">
      {colorsDom}
    </div>
  </div>
}

export default ColorPicker