import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DummyProduct = [{
  id:'p1',
  price:6,
  title:'Math Book',
  description:'for students of calss 10th',
  },
  {
  id:'p2',
  price:6,
  title:'English Book',
  description:'for students of class 7th'
  }]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DummyProduct.map(product => ( <ProductItem
          key = {product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />))}
       
      </ul>
    </section>
  );
};

export default Products;
