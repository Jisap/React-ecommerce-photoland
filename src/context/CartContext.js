import React, { createContext, useState } from 'react';


export const CartContext = createContext(); // Context

const CartProvider = ({ children }) => {

  const[isOpen, setIsOpen] = useState(false);

  return <CartContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </CartContext.Provider>;
};

export default CartProvider;
