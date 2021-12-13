import { Link } from 'react-router-dom'

const MaleHoverContainer = ({ data }) => {
  const categories = data.map(el => el);

  const categoriesDom = [];
  categories.forEach(cat => {
    const subcategoriesDom = [];
    cat.children.forEach(child => {
      subcategoriesDom.push(<p key={child.name}><Link to={`/products/m${child.category_gender_id}`}>{child.name}</Link></p>);
    })
    categoriesDom.push(<div className='categorie' key={cat.name}>
      <h3><Link to={`/products/m${cat.category_gender_id}`}>{cat.name}</Link></h3>
      {subcategoriesDom}
    </div>)
  })

  return <div className='hovCont'>
    {categoriesDom}
  </div>
}

export default MaleHoverContainer