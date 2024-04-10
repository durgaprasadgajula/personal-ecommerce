// import {Link} from 'react-router-dom'

// import './index.css'

// const ProductCard = props => {
//   const {productData} = props
//   const {title, brand, imageUrl, rating, price, id} = productData

//   return (
//     <li className="product-item">
//       <Link to={`/products/${id}`} className="link-item">
//         <img src={imageUrl} alt="product" className="thumbnail" />
//         <h1 className="title">{title}</h1>
//         <p className="brand">by {brand}</p>
//         <div className="product-details">
//           <p className="price">Rs {price}/-</p>
//           <div className="rating-container">
//             <p className="rating">{rating}</p>
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/star-img.png"
//               alt="star"
//               className="star"
//             />
//           </div>
//         </div>
//       </Link>
//     </li>
//   )
// }
// export default ProductCard
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./index.css";

const ProductCard = (props) => {
    const { productData } = props;
    const { title, brand, imageUrl, rating, price, id } = productData;

    return (
        <motion.li
            className="product-item"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
            <Link to={`/products/${id}`} className="link-item">
                <motion.img
                    src={imageUrl}
                    alt="product"
                    className="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                />

                <motion.h1
                    className="title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="brand"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    by {brand}
                </motion.p>
                <div className="product-details">
                    <motion.p
                        className="price"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Rs {price}/-
                    </motion.p>
                    <motion.div
                        className="rating-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <motion.p className="rating">{rating}</motion.p>
                        <motion.img
                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                            alt="star"
                            className="star"
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.2 },
                            }}
                        />
                    </motion.div>
                </div>
            </Link>
        </motion.li>
    );
};

export default ProductCard;
