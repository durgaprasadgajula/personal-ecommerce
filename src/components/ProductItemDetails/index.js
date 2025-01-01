// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import { ThreeDots } from "react-loader-spinner";

// import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

// import CartContext from "../../context/CartContext";

// import Header from "../Header";
// // import SimilarProductItem from '../SimilarProductItem'

// import "./index.css";

// const apiStatusConstants = {
//     initial: "INITIAL",
//     success: "SUCCESS",
//     failure: "FAILURE",
//     inProgress: "IN_PROGRESS",
// };

// const ProductItemDetails = () => {
//     const [productData, setProductData] = useState({});
//     // const [similarProductsData, setSimilarProductsData] = useState([]);
//     const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
//     const [quantity, setQuantity] = useState(1);
//     const params = useParams();
//     const { id } = params;
//     useEffect(() => {
//         getProductData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const getFormattedData = (data) => ({
//         availability: data.availability,
//         brand: data.brand,
//         description: data.description,
//         id: data.id,
//         imageUrl: data.image_url,
//         price: data.price,
//         rating: data.rating,
//         title: data.title,
//         totalReviews: data.total_reviews,
//     });

//     const getProductData = async () => {
//         setApiStatus(apiStatusConstants.inProgress);
//         const jwtToken = Cookies.get("jwt_token");
//         const apiUrl = `http://localhost:8000/products/${id}`;
//         const options = {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//             },
//             method: "GET",
//         };
//         const response = await fetch(apiUrl, options);

//         if (response.ok) {
//             const fetchedData = await response.json();
//             console.log(fetchedData);
//             const updatedData = getFormattedData(fetchedData);
//             // const updatedSimilarProductsData = fetchedData.similar_products.map(
//             //   eachSimilarProduct => getFormattedData(eachSimilarProduct),
//             // )
//             setProductData(updatedData);
//             // setSimilarProductsData(updatedSimilarProductsData);
//             setApiStatus(apiStatusConstants.success);
//         } else if (response.status === 404) {
//             setApiStatus(apiStatusConstants.failure);
//         }
//     };

//     const renderLoadingView = () => (
//         <div className="products-details-loader-container">
//             <ThreeDots color="#0b69ff" height={50} width={50} />
//         </div>
//     );

//     const renderFailureView = () => (
//         <div className="product-details-error-view-container">
//             <img
//                 alt="error view"
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
//                 className="error-view-image"
//             />
//             <h1 className="product-not-found-heading">Product Not Found</h1>
//             <Link to="/products">
//                 <button type="button" className="button">
//                     Continue Shopping
//                 </button>
//             </Link>
//         </div>
//     );

//     const onDecrementQuantity = () => {
//         if (quantity > 1) {
//             setQuantity((prevQuantity) => prevQuantity - 1);
//         }
//     };

//     const onIncrementQuantity = () => {
//         setQuantity((prevQuantity) => prevQuantity + 1);
//     };

//     const renderProductDetailsView = () => (
//         <CartContext.Consumer>
//             {(value) => {
//                 const { brand, description, imageUrl, price, rating, title } =
//                     productData;
//                 const { addCartItem } = value;
//                 const onClickAddToCart = () => {
//                     addCartItem({ ...productData, quantity });
//                 };

//                 return (
//                     <div className="product-details-success-view">
//                         <div className="product-details-container">
//                             <img
//                                 src={imageUrl}
//                                 alt="product"
//                                 className="product-image"
//                             />
//                             <div className="product">
//                                 <h1 className="product-name">{title}</h1>
//                                 <p className="price-details">Rs {price}/-</p>
//                                 <div className="rating-and-reviews-count">
//                                     <div className="rating-container">
//                                         <p className="rating">{rating}</p>
//                                         <img
//                                             src="https://assets.ccbp.in/frontend/react-js/star-img.png"
//                                             alt="star"
//                                             className="star"
//                                         />
//                                     </div>
//                                     <p className="reviews-count">556 Reviews</p>
//                                 </div>
//                                 <p className="product-description">
//                                     {description}
//                                 </p>
//                                 <div className="label-value-container">
//                                     <p className="label">Available:</p>
//                                     <p className="value">In stock</p>
//                                 </div>
//                                 <div className="label-value-container">
//                                     <p className="label">Brand:</p>
//                                     <p className="value">{brand}</p>
//                                 </div>
//                                 <hr className="horizontal-line" />
//                                 <div className="quantity-container">
//                                     <button
//                                         type="button"
//                                         className="quantity-controller-button"
//                                         onClick={onDecrementQuantity}
//                                         aria-label="Decrease quantity"
//                                     >
//                                         <BsDashSquare className="quantity-controller-icon" />
//                                     </button>
//                                     <p className="quantity">{quantity}</p>
//                                     <button
//                                         type="button"
//                                         className="quantity-controller-button"
//                                         onClick={onIncrementQuantity}
//                                         aria-label="Increase quantity"
//                                     >
//                                         <BsPlusSquare className="quantity-controller-icon" />
//                                     </button>
//                                 </div>
//                                 <button
//                                     type="button"
//                                     className="button add-to-cart-btn"
//                                     onClick={onClickAddToCart}
//                                 >
//                                     ADD TO CART
//                                 </button>
//                             </div>
//                         </div>
//                         {/* <h1 className="similar-products-heading">Similar Products</h1> */}
//                         {/* <ul className="similar-products-list">
//               {similarProductsData.map(eachSimilarProduct => (
//                 <SimilarProductItem
//                   productDetails={eachSimilarProduct}
//                   key={eachSimilarProduct.id}
//                 />
//               ))}
//             </ul> */}
//                     </div>
//                 );
//             }}
//         </CartContext.Consumer>
//     );

//     const renderProductDetails = () => {
//         switch (apiStatus) {
//             case apiStatusConstants.success:
//                 return renderProductDetailsView();
//             case apiStatusConstants.failure:
//                 return renderFailureView();
//             case apiStatusConstants.inProgress:
//                 return renderLoadingView();
//             default:
//                 return null;
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="product-item-details-container">
//                 {renderProductDetails()}
//             </div>
//         </>
//     );
// };

// export default ProductItemDetails;
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { motion } from "framer-motion";

import CartContext from "../../context/CartContext";
import Header from "../Header";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = () => {
  const [productData, setProductData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  const getProductData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `${process.env.REACT_APP_API_URL}/products/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);

    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = getFormattedData(fetchedData);
      setProductData(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else if (response.status === 404) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <div className="products-details-loader-container">
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const renderProductDetailsView = () => (
    <CartContext.Consumer>
      {(value) => {
        const { brand, description, imageUrl, price, rating, title } =
          productData;
        const { addCartItem } = value;
        const onClickAddToCart = () => {
          addCartItem({ ...productData, quantity });
        };

        return (
          <div className="product-details-success-view">
            <motion.div
              className="product-details-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={imageUrl}
                alt="product"
                className="product-image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="product">
                <motion.h1
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="product-name"
                >
                  {title}
                </motion.h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">556 Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="label-value-container"
                >
                  <p className="label">Available:</p>
                  <p className="value">In stock</p>
                </motion.div>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="label-value-container"
                >
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </motion.div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={onDecrementQuantity}
                    aria-label="Decrease quantity"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={onIncrementQuantity}
                    aria-label="Increase quantity"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <motion.button
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                  whileHover={{ scale: 1.05 }}
                >
                  ADD TO CART
                </motion.button>
              </div>
            </motion.div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
