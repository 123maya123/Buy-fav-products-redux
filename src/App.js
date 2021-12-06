//install redux by clicking in terminal : npm install @reduxjs/toolkit
//also install npm react-redux
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import React, { useEffect } from "react";
/*useEffect watch for changes in Cart state,useEffcet allows us to run sideEffects 
n it allows us a run a effct when some dependancy changes */
import Notification from "./components/UI/Notification";
import {sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible); //cartIsVisible defined in store/ui-slice.js
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch]);
  /* by PUT we store data in firebase but the differece in PUT n POST is new data will not added 
to existing list it will override existing data in case of PUT */
  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
