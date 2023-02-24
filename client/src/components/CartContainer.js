import React from 'react'
import { useAppContext } from '../context/appContext'
import CartItem from './CartItem'
import RazorPay from "../pages/RazorPay"
const CartContainer = () => {
  const { cart, total, clearCart } = useAppContext()
  if (cart.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>{`\u20B9`}{Math.floor(total)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={clearCart}>
          clear cart
        </button>
        <button className='btn padpaybtn' >
            <RazorPay paymentAmount={Math.floor(total)}/>
        </button>
      </footer>
    </section>
  )
}

export default CartContainer