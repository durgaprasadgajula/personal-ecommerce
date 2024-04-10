// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// import CartContext from "../../context/CartContext";

// import "./index.css";

// const Header = () => {
//     const navigate = useNavigate(); // Use useHistory hook to access history object

//     const onClickLogout = () => {
//         Cookies.remove("jwt_token");
//         navigate("/login");
//     };

//     const renderCartItemsCount = () => (
//         <CartContext.Consumer>
//             {(value) => {
//                 const { cartList } = value;
//                 const cartItemsCount = cartList.length;

//                 return (
//                     <>
//                         {cartItemsCount > 0 ? (
//                             <span className="cart-count-badge">
//                                 {cartList.length}
//                             </span>
//                         ) : null}
//                     </>
//                 );
//             }}
//         </CartContext.Consumer>
//     );

//     return (
//         <nav className="nav-header">
//             <div className="nav-content">
//                 <div className="nav-bar-mobile-logo-container">
//                     <Link to="/">
//                         <img
//                             className="website-logo"
//                             src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
//                             alt="website logo"
//                         />
//                     </Link>

//                     <button
//                         type="button"
//                         className="nav-mobile-btn"
//                         onClick={onClickLogout}
//                     >
//                         <img
//                             src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
//                             alt="nav logout"
//                             className="nav-bar-img"
//                         />
//                     </button>
//                 </div>

//                 <div className="nav-bar-large-container">
//                     <Link to="/">
//                         <img
//                             className="website-logo"
//                             src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
//                             alt="website logo"
//                         />
//                     </Link>
//                     <ul className="nav-menu">
//                         <li className="nav-menu-item">
//                             <Link to="/" className="nav-link">
//                                 Home
//                             </Link>
//                         </li>

//                         <li className="nav-menu-item">
//                             <Link to="/products" className="nav-link">
//                                 Products
//                             </Link>
//                         </li>

//                         <li className="nav-menu-item">
//                             <Link to="/cart" className="nav-link">
//                                 Cart
//                                 {renderCartItemsCount()}
//                             </Link>
//                         </li>
//                     </ul>
//                     <button
//                         type="button"
//                         className="logout-desktop-btn"
//                         onClick={onClickLogout}
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//             <div className="nav-menu-mobile">
//                 <ul className="nav-menu-list-mobile">
//                     <li className="nav-menu-item-mobile">
//                         <Link to="/" className="nav-link">
//                             <img
//                                 src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
//                                 alt="nav home"
//                                 className="nav-bar-img"
//                             />
//                         </Link>
//                     </li>

//                     <li className="nav-menu-item-mobile">
//                         <Link to="/products" className="nav-link">
//                             <img
//                                 src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
//                                 alt="nav products"
//                                 className="nav-bar-img"
//                             />
//                         </Link>
//                     </li>
//                     <li className="nav-menu-item-mobile">
//                         <Link to="/cart" className="nav-link">
//                             <img
//                                 src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
//                                 alt="nav cart"
//                                 className="nav-bar-img"
//                             />
//                             {renderCartItemsCount()}
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Header;
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CartContext from "../../context/CartContext";
import "./index.css";

const Header = () => {
    const navigate = useNavigate();

    const onClickLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/login");
    };

    const renderCartItemsCount = () => (
        <CartContext.Consumer>
            {(value) => {
                const { cartList } = value;
                const cartItemsCount = cartList.length;

                return (
                    <>
                        {cartItemsCount > 0 && (
                            <span className="cart-count-badge">
                                {cartList.length}
                            </span>
                        )}
                    </>
                );
            }}
        </CartContext.Consumer>
    );

    return (
        <nav className="nav-header">
            <div className="nav-content">
                <div className="nav-bar-mobile-logo-container">
                    <Link to="/">
                        <img
                            className="website-logo"
                            src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712653908/Screenshot_2024-04-09_144038_kqpydu.svg"
                            alt="website logo"
                        />
                    </Link>

                    <button
                        type="button"
                        className="nav-mobile-btn"
                        onClick={onClickLogout}
                    >
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                            alt="nav logout"
                            className="nav-bar-img"
                        />
                    </button>
                </div>

                <div className="nav-bar-large-container">
                    <Link to="/">
                        <motion.img
                            className="website-logo"
                            src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712653908/Screenshot_2024-04-09_144038_kqpydu.svg"
                            alt="website logo"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        />
                    </Link>
                    <ul className="nav-menu">
                        <motion.li
                            className="nav-menu-item"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </motion.li>

                        <motion.li
                            className="nav-menu-item"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Link to="/products" className="nav-link">
                                Products
                            </Link>
                        </motion.li>

                        <motion.li
                            className="nav-menu-item"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Link to="/cart" className="nav-link">
                                Cart
                                {renderCartItemsCount()}
                            </Link>
                        </motion.li>
                    </ul>
                    <motion.button
                        type="button"
                        className="logout-desktop-btn"
                        onClick={onClickLogout}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        Logout
                    </motion.button>
                </div>
            </div>
            <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                    <li className="nav-menu-item-mobile">
                        <Link to="/" className="nav-link">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                                alt="nav home"
                                className="nav-bar-img"
                            />
                        </Link>
                    </li>

                    <li className="nav-menu-item-mobile">
                        <Link to="/products" className="nav-link">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                                alt="nav products"
                                className="nav-bar-img"
                            />
                        </Link>
                    </li>
                    <li className="nav-menu-item-mobile">
                        <Link to="/cart" className="nav-link">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                                alt="nav cart"
                                className="nav-bar-img"
                            />
                            {renderCartItemsCount()}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
