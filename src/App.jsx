import { Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense, useState } from "react";

const Signup = lazy(() => import("./components/Signup"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const Home = lazy(() => import("./components/Home"));
const NotFound = lazy(() => import("./components/NotFound"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Cart = lazy(() => import("./components/Cart"));
const Products = lazy(() => import("./components/Products"));
const ProductItemDetails = lazy(() =>
  import("./components/ProductItemDetails")
);
import Loader from "./components/Loader";

import "./App.css";
import CartContext from "./context/CartContext";

function App() {
  const [cartList, setCartList] = useState([]);

  const addCartItem = (product) => {
    setCartList((prevList) => {
      const existingItem = prevList.find(
        (eachItem) => eachItem.id === product.id
      );

      if (existingItem) {
        return prevList.map((eachItem) =>
          eachItem.id === product.id
            ? { ...eachItem, quantity: eachItem.quantity + 1 }
            : eachItem
        );
      } else {
        return [...prevList, { ...product, quantity: 1 }];
      }
    });
  };

  const deleteCartItem = (id) => {
    setCartList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevList) =>
      prevList.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeAllCartItem = () => {
    setCartList([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        deleteCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItem,
      }}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductItemDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Suspense>
    </CartContext.Provider>
  );
}

export default App;
