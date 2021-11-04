const FemaleHoverContainer = ({ data }) => {
  
  const categories = data.map(el => el);

  const categoriesDom = [];
  categories.forEach(cat => {
    const subcategoriesDom = [];
    cat.children.forEach(child => {
      subcategoriesDom.push(<p>{child.name}</p>);
    })
    categoriesDom.push(<div className='categorie' key={cat.name}>
      <h3>{cat.name}</h3>
      {subcategoriesDom}
    </div>)
  })

  return <div className='hovCont'>
    {categoriesDom}
  </div>
}

export default FemaleHoverContainer