import {useDispatch, useSelector} from 'react-redux'
import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice';//uiAction is name import from ui-slice.js

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity)//bcoz in iindex.js we gave cart property

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }
  
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
