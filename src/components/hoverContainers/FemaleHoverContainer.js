import { Link } from "react-router-dom";

const FemaleHoverContainer = ({ data }) => {
  
  const categories = data.map(el => el);

  const categoriesDom = [];
  categories.forEach(cat => {
    const subcategoriesDom = [];
    cat.children.forEach(child => {
      subcategoriesDom.push(<p key={child.name}><Link style={{color: '#2E2E2E'}} to={`/products/f${child.category_gender_id}`}>{child.name}</Link></p>);
    })
    categoriesDom.push(<div className='categorie' key={cat.name}>
      <h3><Link style={{color: '#2E2E2E'}} to={`/products/f${cat.category_gender_id}`}>{cat.name}</Link></h3>
      {subcategoriesDom}
    </div>)
  })

  return <div className='hovCont'>
    {categoriesDom}
  </div>
}

export default FemaleHoverContainer