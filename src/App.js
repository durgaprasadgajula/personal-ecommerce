
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RegisterForm from "./components/RegisterForm";

function App() {
    const [cartList, setCartList] = useState([]);

    const addCartItem = (product) => {
        const productObject = cartList.find(
            (eachCartItem) => eachCartItem.id === product.id
        );

        if (productObject) {
            setCartList((prevCartList) =>
                prevCartList.map((eachCartItem) =>
                    eachCartItem.id === productObject.id
                        ? {
                              ...eachCartItem,
                              quantity:
                                  eachCartItem.quantity + product.quantity,
                          }
                        : eachCartItem
                )
            );
        } else {
            setCartList((prevCartList) => [...prevCartList, product]);
        }
    };

    const removeCartItem = (id) => {
        setCartList((prevCartList) =>
            prevCartList.filter((eachCartItem) => eachCartItem.id !== id)
        );
    };

    const incrementCartItemQuantity = (id) => {
        setCartList((prevCartList) =>
            prevCartList.map((eachCartItem) =>
                eachCartItem.id === id
                    ? { ...eachCartItem, quantity: eachCartItem.quantity + 1 }
                    : eachCartItem
            )
        );
    };

    const decrementCartItemQuantity = (id) => {
        setCartList((prevCartList) =>
            prevCartList.map((eachCartItem) =>
                eachCartItem.id === id && eachCartItem.quantity > 1
                    ? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
                    : eachCartItem
            )
        );
    };

    const removeAllCartItems = () => {
        setCartList([]);
    };

    // useEffect(() => {
    //     // Fetch initial cart data, if necessary
    // }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    return (
        <Router>
            <ToastContainer />
            <CartContext.Provider
                value={{
                    cartList,
                    addCartItem,
                    removeCartItem,
                    incrementCartItemQuantity,
                    decrementCartItemQuantity,
                    removeAllCartItems,
                }}
            >
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/:id"
                            element={<ProductItemDetails />}
                        />
                        <Route path="/cart" element={<Cart />} />
                    </Route>
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </CartContext.Provider>
        </Router>
    );
}

export default App;
