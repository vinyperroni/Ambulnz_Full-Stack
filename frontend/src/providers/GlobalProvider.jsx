import GlobalContext from "../context/GlobalContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL_PIZZAS, BASE_URL_ORDERS } from "../assets/BASE_URL";

export default function GlobalProvider(props) {
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [orderStatus, setOrderStatus] = useState({
    isSuccess: false,
    order: null,
  });

  useEffect(() => {
    getPizzas();
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const getPizzas = () => {
    // setIsLoading(true);
    axios
      .get(`${BASE_URL_PIZZAS}`)
      .then((response) => {
        setPizzas(response.data.pizzas);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
  };

  const createOrder = () => {
    // setIsLoading(true);
    const body = {
      pizzas: cart,
    };
    axios
      .post(`${BASE_URL_ORDERS}`, body)
      .then((response) => {
        setOrderStatus({
          isSuccess: true,
          order: response.data.order,
        });
        localStorage.removeItem("cart");
        setCart([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCart = (pizza) => {
    let isOnCart = false;
    for (const item of cart) {
      if (item.name === pizza.name) {
        isOnCart = true;
      }
    }
    if (isOnCart) {
      const newCart = cart.map((item) => {
        if (item.name === pizza.name) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newItem = {
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
      };
      const newCart = [...cart, newItem];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeFromCart = (pizza) => {
    const newCart = cart
      .map((item) => {
        if (item.name === pizza.name) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        pizzas,
        addToCart,
        removeFromCart,
        createOrder,
        orderStatus,
        setOrderStatus,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
