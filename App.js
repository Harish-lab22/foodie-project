
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
function App() {

  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});

  const addToCart = (food) => {

    const existingItem = cart.find(
      (item) => item.id === food.id
    );

    if (existingItem) {

      const updatedCart = cart.map((item) =>

        item.id === food.id

          ? {
              ...item,
              quantity: item.quantity + 1
            }

          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        { ...food, quantity: 1 }
      ]);

    }
  };

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item.id === id

        ? {
            ...item,
            quantity: item.quantity + 1
          }

        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) =>

        item.id === id

          ? {
              ...item,
              quantity: item.quantity - 1
            }

          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  };
useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);
  return (

    <BrowserRouter>

  <Navbar cart={cart} />

  <Routes>
        <Route
          path="/"
          element={
            <Home addToCart={addToCart} />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={
                increaseQuantity
              }
              decreaseQuantity={
                decreaseQuantity
              }
              removeItem={removeItem}
            />
          }
        />
        <Route
  path="/checkout"
  element={<Checkout />}
/>
<Route
  path="/success"
  element={<OrderSuccess />}
/>
<Route
  path="/orders"
  element={<Orders />}
/>

<Route
  path="/admin"
  element={<Admin />}
/>
      </Routes>

<Footer />

</BrowserRouter>
  );
}

export default App;