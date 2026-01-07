import React, { useContext } from 'react'
import "./Cart.css";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);

    const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Items</p>
          <p>Items</p>

        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
            {
            return (
              <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={`http://localhost:4000/images/${item.image}`} />

                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
              </div>
            )  
          }
          
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee  </p>
              <p> ₹{getTotalCartAmount()===0?0:21}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+21}</p>
            </div>
          </div>
            <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code ,Enter here</p>
            <div className="cart-promocode-input">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Cart
