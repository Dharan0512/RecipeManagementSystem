import {
    GET_FILTER_DATA,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    TOGGLE_AMOUNT,
    ADD_TO_CART,
    GET_TOTALS
  } from "./action";
  
  import { initialState } from "./appContext";
  
  const reducer = (state, action) => {
    if (action.type === GET_FILTER_DATA) {
      const { msg } = action.payload;
      console.log("action", action);
      return {
        action,
      };
    }
    // ---------------------Register User------------------------//
    if (action.type === REGISTER_USER_BEGIN) {
      return {
        ...state,
        isLoading: true,
      };
    }
    if (action.type === REGISTER_USER_SUCCESS) {
      const { user, token, location } = action.payload;
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User Created! Redirecting...",
        user,
        token,
        userLocation: location,
        jobLocation: location,
      };
    }
    if (action.type === REGISTER_USER_ERROR) {
      return {
        ...state,
        alertText: action.payload.msg,
      };
    }
  
    // --------------------Login User----------------------------//
  
    if (action.type === LOGIN_USER_BEGIN) {
      return {
        ...state,
      };
    }
    if (action.type === LOGIN_USER_SUCCESS) {
      const { user, token, location } = action.payload;
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Login Successfull! Redirecting...",
        user,
        token,
        userLocation: location,
      };
    }
  
    if (action.type === LOGIN_USER_ERROR) {
      return {
        ...state,
        alertText: action.payload.msg,
      };
    }
    
    //cart reducer
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    }
  }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { pricePerServing, servings, amount } = cartItem
        const itemTotal = (pricePerServing * servings) * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
      console.log('total',total,'am',amount);
      
    return { ...state, total, amount }
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }
  //Add cart item TODO:
  if(action.type === ADD_TO_CART){
    console.log('reducer');
    
    return{
      ...state,
      cart: [...state.cart, action.payload]
    }
  }
  if (action.type === TOGGLE_AMOUNT) {
    let tempCart = state.cart
    .map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        if (action.payload.type === 'inc') {
          return { ...cartItem, amount: cartItem.amount + 1 }
        }
        if (action.payload.type === 'dec') {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
      }
      return cartItem
    })
    .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: tempCart }
  }
  throw new Error('no matching action type')

};
  
  export default reducer;
  