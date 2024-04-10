// import {Link} from 'react-router-dom'
// import Header from '../Header'

// import './index.css'

// const Home = () => (
//   <>
//     <Header />
//     <div className="home-container">
//       <div className="home-content">
//         <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
//         <img
//           src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
//           alt="clothes that get you noticed"
//           className="home-mobile-img"
//         />
//         <p className="home-description">
//           Fashion is part of the daily air and it does not quite help that it
//           changes all the time. Clothes have always been a marker of the era and
//           we are in a revolution. Your fashion makes you been seen and heard
//           that way you are. So, celebrate the seasons new and exciting fashion
//           in your own way.
//         </p>
//         <Link to="/products">
//           <button type="button" className="shop-now-button">
//             Shop Now
//           </button>
//         </Link>
//       </div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
//         alt="clothes that get you noticed"
//         className="home-desktop-img"
//       />
//     </div>
//   </>
// )

// export default Home
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header";

import "./index.css";

const Home = () => (
    <>
        <Header />
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="home-content">
                <motion.h1
                    className="home-heading"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Clothes That Get YOU Noticed
                </motion.h1>
                <motion.img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                    alt="clothes that get you noticed"
                    className="home-mobile-img"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0, duration: 0.5 }}
                />
                <motion.p
                    className="home-description"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    Fashion is part of the daily air and it does not quite help
                    that it changes all the time. Clothes have always been a
                    marker of the era and we are in a revolution. Your fashion
                    makes you been seen and heard that way you are. So,
                    celebrate the seasons new and exciting fashion in your own
                    way.
                </motion.p>
                <Link to="/products">
                    <motion.button
                        type="button"
                        className="shop-now-button"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        Shop Now
                    </motion.button>
                </Link>
            </div>
            <motion.img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="clothes that get you noticed"
                className="home-desktop-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            />
        </motion.div>
    </>
);

export default Home;
