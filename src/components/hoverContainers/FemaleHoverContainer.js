import { Link } from "react-router-dom";

const FemaleHoverContainer = ({ data }) => {
  
  const categories = data.map(el => el);

  const categoriesDom = [];
  categories.forEach(cat => {
    const subcategoriesDom = [];
    cat.children.forEach(child => {
      subcategoriesDom.push(<p key={child.name}><Link to={`/female/${child.id}`}>{child.name}</Link></p>);
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