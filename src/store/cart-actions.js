import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async() => {
      const response = await fetch(
        "https://react-redux-project-6cb57-default-rtdb.firebaseio.com/cart.json"
        );
     if(!response.ok){
       throw new Error('Could not fetch cart data!');
     }
    const data = await response.json();

    return data; 
   };
   try{
     const cartData = await fetchData();
     dispatch(cartActions.replaceCart({
       items: cartData.items || [],
       totalQuantity: cartData.totalQuantity
     }));
   } catch(error) {
     dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: "Fetching Cart Data Failed!",
      })
    );
   }
  }
}

export const sendCartData = (cart) => { // this one is a "thunk" because it defers work for later:
    //redux toolkit prepared for action creaters that return not just object but functions also
    return async(dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Sending",
          message: "Sending Cart Data",
        })
      );
  
      const sendRequest = async() => {
        const response = await fetch(
          "https://react-redux-project-6cb57-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
              items:cart.items,
              totalQuantity:cart.totalQuantity}),
          }
        );
        if (!response.ok) {
          throw new Error("Sending Cart Data Failed!");
        }
      }
      try{
        await sendRequest();
        
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent Cart Data successfully',
        })
      );//if we dont hv error we dispatch success notification
      }catch (error){
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error',
            message: "Sending Cart Data Failed!",
          })
        );
      };
  
     
    }
  }
  