import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext(); // Context

const CartProvider = ({ children }) => {

  const[isOpen, setIsOpen] = useState(false);
  const[cart, setCart] = useState([]);
  const[itemsAmount, setItemsAmount] = useState(0);
  const[amount, setAmount] = useState(0);
  const[total, setTotal] = useState(0);

  // cart amount
  useEffect(() => {
    const amount = cart.reduce((a,c) => {  // a:acumulator, c:currentValue
      return a + c.amount;                 // reduce itera sobre cada elemento del array "cart"  
    },0);                                  // y en cada iteracción suma la cantidad "amount" al acumulador 
    setItemsAmount(amount)
  },[cart]);

  // // Original add to cart
  // const addToCart = (item, id) => {
    
  //   const itemID = parseInt(id);
  //   const newItem = { ...item[0], amount: 1 }; // item seleccionado para añadir al carrito
  //   setCart([...cart, newItem]);               // estado para cart con el nuevo item   
    
  //   // check if item is already in the cart
  //   const cartItem = cart.find(item => {       // Buscamos en el estado del carrito si hay un item cuyo id = al pasado por parámetro 
  //     return item.id === itemID                // Si existe es que esta comprandose otra vez. 
  //   });

  //   if(cartItem){                                         // Si se está comprando otra vez,
  //     const newCart = cart.map(item => {                  // mapeamos el carrito y seleccionaremos ese item repetido
  //       if(item.id === itemID){                           // cuyos ids (iterado y el del params) sean iguales 
  //         setAmount( cartItem.amount + 1 );               // Estado de cantidad con item repetido +1 
  //         return {...item, amount: cartItem.amount + 1};  // A ese item repetido le aumentaremos la cantidad en 1 con el estado de amount.
  //       }else{
  //         return item;
  //       }    
  //     });

  //     setCart(newCart); // El estado se modificará con ese newCart
  //   }else{
  //     setCart([...cart, newItem]); // Si solo se compra un item se añade ese único item al carrito
  //   }
  // // open the cart sidebar
  //   setIsOpen(true);
  // };

  // refactoring addToCart
  const addToCart = (item, id) => {
    const itemID = parseInt(id);

    // check if item is already in the cart
    const existingCartItemIndex = cart.findIndex((item) => item.id === itemID);

    if (existingCartItemIndex !== -1) {  // item already exists in cart
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].amount += 1;
      setCart(updatedCart);
    } else {  // item doesn't exist in cart
      const newItem = { ...item[0], amount: 1 };
      setCart([...cart, newItem]);
    }

    setIsOpen(true); // open the cart sidebar
  };


  // remove form cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  //handleInput
  const handleInput = (e, id) => {
    const value = parseInt(e.target.value);     // Valor del input convertido a int
    const cartItem = cart.find(item => {        // Buscamos el item en el carrito
      return item.id === id;
    });
    
    if(cartItem){                               // Si existe el item
      const newCart = cart.map( item => {       // creamos una copia del carrito iterando el original donde
        if(item.id === id) {                    // si el item que queremos modificar,
          if(isNaN(value)){                     // el valor del input no es un número
            setAmount(1)                        // establecemos la cantidad en 1
            return {...item, amount:1}          // y retornamos ese item con la cantidad en 1
          }else {                               // pero si es valor es un número
            setAmount(value)                    // establecemos la cantidad en dicho número
            return { ...item, amount: value }   // y retornamos el item con la cantidad = value
          }
        }else {                                 // El resto de items que no se modifican se dejan como estaban
          return item
        }
      });
      setCart(newCart);                         // Al final establecemos el estado del carrito con la copia que contiene las modificaciones
    }
    setIsOpen(true)
  };

  // Refactorización de handleInput
    
  //   const handleInput = (e, id) => {
  //     const value = parseInt(e.target.value);
    
  //     const updatedCart = cart.map(item => {
  //       if(item.id === id) {
  //         const newAmount = isNaN(value) ? 1 : value;
  //         setAmount(newAmount);
  //         return { ...item, amount: newAmount };
  //       } else {
  //         return item;
  //       }
  //     });

  //   setCart(updatedCart);
  //   setIsOpen(true);
  // }

  // handleSelect
  const handleSelect = (e, id) => {
    const value = parseInt( e.target.value );
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    
    if(cartItem){
      const newCart = [...cart].map( item => {
        if(item.id === id) {
          setAmount(value)
          return { ...item, amount:value }
        }else{
          return item
        }
      });
      setCart(newCart);  
    }
  };

  // cart total
  useEffect(() => {
    const total = cart.reduce((a , c) => {
      return a + (c.attributes.price * c.amount);
    }, 0);
    setTotal(total);
  },[cart])

  return <CartContext.Provider 
    value={{
      isOpen, 
      setIsOpen, 
      addToCart, 
      removeFromCart, 
      cart, 
      itemsAmount,
      handleInput,
      handleSelect,
      total,
    }}>
      {children}
    </CartContext.Provider>;
};

export default CartProvider;
