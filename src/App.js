// // import { Component } from "react";
// // import { Route, Navigate, Routes } from "react-router-dom";

// // import LoginForm from "./components/LoginForm";
// // import Home from "./components/Home";
// // import Products from "./components/Products";
// // import ProductItemDetails from "./components/ProductItemDetails";
// // import Cart from "./components/Cart";
// // import NotFound from "./components/NotFound";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import CartContext from "./context/CartContext";

// // import "./App.css";
// // import RegisterForm from "./components/RegisterForm";

// // class App extends Component {
// //     state = {
// //         cartList: [],
// //     };

// //     removeAllCartItems = () => {
// //         this.setState({ cartList: [] });
// //     };

// //     incrementCartItemQuantity = (id) => {
// //         this.setState((prevState) => ({
// //             cartList: prevState.cartList.map((eachCartItem) => {
// //                 if (id === eachCartItem.id) {
// //                     const updatedQuantity = eachCartItem.quantity + 1;
// //                     return { ...eachCartItem, quantity: updatedQuantity };
// //                 }
// //                 return eachCartItem;
// //             }),
// //         }));
// //     };

// //     decrementCartItemQuantity = (id) => {
// //         const { cartList } = this.state;
// //         const productObject = cartList.find(
// //             (eachCartItem) => eachCartItem.id === id
// //         );
// //         if (productObject.quantity > 1) {
// //             this.setState((prevState) => ({
// //                 cartList: prevState.cartList.map((eachCartItem) => {
// //                     if (id === eachCartItem.id) {
// //                         const updatedQuantity = eachCartItem.quantity - 1;
// //                         return { ...eachCartItem, quantity: updatedQuantity };
// //                     }
// //                     return eachCartItem;
// //                 }),
// //             }));
// //         } else {
// //             this.removeCartItem(id);
// //         }
// //     };

// //     removeCartItem = (id) => {
// //         const { cartList } = this.state;
// //         const updatedCartList = cartList.filter(
// //             (eachCartItem) => eachCartItem.id !== id
// //         );

// //         this.setState({ cartList: updatedCartList });
// //     };

// //     addCartItem = (product) => {
// //         const { cartList } = this.state;
// //         const productObject = cartList.find(
// //             (eachCartItem) => eachCartItem.id === product.id
// //         );

// //         if (productObject) {
// //             this.setState((prevState) => ({
// //                 cartList: prevState.cartList.map((eachCartItem) => {
// //                     if (productObject.id === eachCartItem.id) {
// //                         const updatedQuantity =
// //                             eachCartItem.quantity + product.quantity;

// //                         return { ...eachCartItem, quantity: updatedQuantity };
// //                     }

// //                     return eachCartItem;
// //                 }),
// //             }));
// //         } else {
// //             const updatedCartList = [...cartList, product];

// //             this.setState({ cartList: updatedCartList });
// //         }
// //     };

// //     render() {
// //         const { cartList } = this.state;

// //         return (
// //             <CartContext.Provider
// //                 value={{
// //                     cartList,
// //                     addCartItem: this.addCartItem,
// //                     removeCartItem: this.removeCartItem,
// //                     incrementCartItemQuantity: this.incrementCartItemQuantity,
// //                     decrementCartItemQuantity: this.decrementCartItemQuantity,
// //                     removeAllCartItems: this.removeAllCartItems,
// //                 }}
// //             >
// //                 <>
// //                     <Routes>
// //                         <Route path="/login" element={<LoginForm />} />
// //                         <Route path="/register" element={<RegisterForm />} />
// //                         <ProtectedRoute path="/" element={<Home />} />
// //                         <ProtectedRoute
// //                             path="/products"
// //                             element={<Products />}
// //                         />
// //                         <ProtectedRoute
// //                             path="/products/:id"
// //                             element={<ProductItemDetails />}
// //                         />
// //                         <ProtectedRoute path="/cart" element={<Cart />} />
// //                         <Route path="/not-found" element={<NotFound />} />
// //                         <Route
// //                             path="*"
// //                             element={<Navigate to="/not-found" />}
// //                         />
// //                     </Routes>
// //                 </>
// //             </CartContext.Provider>
// //         );
// //     }
// // }

// // export default App;
// import { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import LoginForm from './components/LoginForm';
// import Home from './components/Home';
// import Products from './components/Products';
// import ProductItemDetails from './components/ProductItemDetails';
// import Cart from './components/Cart';
// import NotFound from './components/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';
// import CartContext from './context/CartContext';

// import './App.css';
// import RegisterForm from './components/RegisterForm';

// class App extends Component {
//   state = {
//     cartList: [],
//   };

//   removeAllCartItems = () => {
//     this.setState({ cartList: [] });
//   };

//   incrementCartItemQuantity = (id) => {
//     this.setState((prevState) => ({
//       cartList: prevState.cartList.map((eachCartItem) => {
//         if (id === eachCartItem.id) {
//           const updatedQuantity = eachCartItem.quantity + 1;
//           return { ...eachCartItem, quantity: updatedQuantity };
//         }
//         return eachCartItem;
//       }),
//     }));
//   };

//   decrementCartItemQuantity = (id) => {
//     const { cartList } = this.state;
//     const productObject = cartList.find((eachCartItem) => eachCartItem.id === id);
//     if (productObject.quantity > 1) {
//       this.setState((prevState) => ({
//         cartList: prevState.cartList.map((eachCartItem) => {
//           if (id === eachCartItem.id) {
//             const updatedQuantity = eachCartItem.quantity - 1;
//             return { ...eachCartItem, quantity: updatedQuantity };
//           }
//           return eachCartItem;
//         }),
//       }));
//     } else {
//       this.removeCartItem(id);
//     }
//   };

//   removeCartItem = (id) => {
//     const { cartList } = this.state;
//     const updatedCartList = cartList.filter((eachCartItem) => eachCartItem.id !== id);

//     this.setState({ cartList: updatedCartList });
//   };

//   addCartItem = (product) => {
//     const { cartList } = this.state;
//     const productObject = cartList.find((eachCartItem) => eachCartItem.id === product.id);

//     if (productObject) {
//       this.setState((prevState) => ({
//         cartList: prevState.cartList.map((eachCartItem) => {
//           if (productObject.id === eachCartItem.id) {
//             const updatedQuantity = eachCartItem.quantity + product.quantity;

//             return { ...eachCartItem, quantity: updatedQuantity };
//           }

//           return eachCartItem;
//         }),
//       }));
//     } else {
//       const updatedCartList = [...cartList, product];

//       this.setState({ cartList: updatedCartList });
//     }
//   };

//   render() {
//     const { cartList } = this.state;

//     return (
//       <Router>
//         <CartContext.Provider
//           value={{
//             cartList,
//             addCartItem: this.addCartItem,
//             removeCartItem: this.removeCartItem,
//             incrementCartItemQuantity: this.incrementCartItemQuantity,
//             decrementCartItemQuantity: this.decrementCartItemQuantity,
//             removeAllCartItems: this.removeAllCartItems,
//           }}
//         >
//           <Routes>
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<RegisterForm />} />
//             <ProtectedRoute path="/" element={<Home />} />
//             <ProtectedRoute path="/products" element={<Products />} />
//             <ProtectedRoute path="/products/:id" element={<ProductItemDetails />} />
//             <ProtectedRoute path="/cart" element={<Cart />} />
//             <Route path="/not-found" element={<NotFound />} />
//             <Route path="*" element={<Navigate to="/not-found" />} />
//           </Routes>
//         </CartContext.Provider>
//       </Router>
//     );
//   }
// }

// export default App;
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
