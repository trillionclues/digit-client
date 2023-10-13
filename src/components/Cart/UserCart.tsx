import React from 'react';
import {AiOutlineShopping} from 'react-icons/ai'
import './cart.css'

const UserCart = ({ count }: {count: number}) => {
  return (
    <div className="relative text-xl">
      <AiOutlineShopping className="bg-white"/>
      <span className="cart-counter">{count}</span>
    </div>
  );
};

export default UserCart;
