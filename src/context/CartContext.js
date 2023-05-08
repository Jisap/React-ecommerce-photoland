import React, { createContext, useState } from 'react';

export const CartContext = createContext(); // Context

const CartProvider = ({ children }) => {

  const[isOpen, setIsOpen] = useState(false);
  const[cart, setCart] = useState([]);
  const[itemsAmount, setItemsAmount] = useState(0);
  const[amount, setAmount] = useState(0);
  const[total, setTotal] = useState(0);

  // add to cart
  const addToCart = (item, id) => {
    
    const itemID = parseInt(id);
    const newItem = { ...item[0], amount: 1 }; // item seleccionado para añadir al carrito
    setCart([...cart, newItem]);               // estado para cart con el nuevo item   
    
    // check if item is already in the cart
    const cartItem = cart.find(item => {       // Buscamos en el estado del carrito si hay un item cuyo id = al pasado por parámetro 
      return item.id === itemID                // Si existe es que esta comprandose otra vez. 
    });

    if(cartItem){                                         // Si se está comprando otra vez,
      const newCart = cart.map(item => {                  // mapeamos el carrito y seleccionaremos ese item repetido
        if(item.id === itemID){                           // cuyos ids (iterado y el del params) sean iguales 
          setAmount( cartItem.amount + 1 );               // Estado de cantidad con item repetido +1 
          return {...item, amount: cartItem.amount + 1};  // A ese item repetido le aumentaremos la cantidad en 1 con el estado de amount.
        }else{
          return item;
        }    
      });

      setCart(newCart); // El estado se modificará con ese newCart
    }else{
      setCart([...cart, newItem]); // Si solo se compra un item se añade ese único item al carrito
    }
    //open the cart sidebar
    setIsOpen(true);
  };

  // remove form cart


  return <CartContext.Provider value={{isOpen, setIsOpen, addToCart, cart}}>
      {children}
    </CartContext.Provider>;
};

export default CartProvider;
